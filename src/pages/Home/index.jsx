import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import Sidebar from "../../components/Sidebar";
import spotifyApi from "../../globals";
import Navbar from "../../components/Navbar";
import * as service from "../../service"
import LikedSongsList from "../../components/SongsList";
import Playlists from "../../components/Playlists";
import Albums from "../../components/Albums";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/user-redux/index';
import { fetchPlaylists } from '../../redux/playlist-redux/index';
import { fetchCreatedAlbums } from '../../redux/album-redux/index';
import { fetchSongs} from '../../redux/song-redux/index';

const Home = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [albums, setAlbums] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const playlists = useSelector((state) => state.playlists);
	const createdAlbums = useSelector((state) => state.albums);
	const songs = useSelector((state) => state.songs);


	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchPlaylists());
		dispatch(fetchCreatedAlbums());
		dispatch(fetchSongs());
	}, [dispatch]);



	const fetchAlbums = async () => {
		try {
			const data = await spotifyApi.getNewReleases({ limit: 10 , country: 'US'});//await spotifyApi.getFeaturedPlaylists({ limit: 10 , country: 'US'});
			const createdData = await service.getSortedAlbums();
			setAlbums([...createdData, ...data.albums.items]);
		}
		catch (e) {
			const createdData = await service.getSortedAlbums();
			setAlbums([...createdData]);
		}
	}




	useEffect(() => {
		async function fetchData() {
			await fetchUser();
			await fetchSongs();
			await fetchAlbums();
			await fetchCreatedAlbums();
			await fetchPlaylists();
		}
		setIsFetching(true);
		fetchData();
		setIsFetching(false);

	}, []);


	return (
		<div className={styles.container}>
		<Fragment>
			<Navbar className={styles.nav}/>
			<Sidebar className={styles.sidebar}/>
			<div className={styles.content}>
				{user && (
					<h1 className={styles.welcome_message}>Welcome back, {user.name}!</h1>
				)}

				{isFetching && (
					<div className={styles.progress_container}>
						<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
					</div>
				)}
				<div>
					<h2>Most Recent Albums</h2>
					<Albums albums={albums}/>
				</div>

				{user && (
					<div >
						<h2>Your Liked Songs</h2>

						<LikedSongsList songs={songs}/>

						<h2>Your Playlists</h2>
						<Playlists playlists={playlists}/>

					</div>
				)}

				{user && user.userType === "artist" &&(
					<div>
						<h2>Your Created Albums</h2>
						<Albums albums={createdAlbums}/>

					</div>
				)}
			</div>
		</Fragment>
		</div>
	);
};
export default Home;
