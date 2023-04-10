import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import Sidebar from "../../components/Sidebar";
import spotifyApi from "../../globals";
import Navbar from "../../components/Navbar";
import * as service from "../../auth-service"
import LikedSongsList from "../../components/SongsList";
import Playlists from "../../components/Playlists";
import Albums from "../../components/Albums";

const Home = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [albums, setAlbums] = useState([]);
	const [createdAlbums, setCreatedAlbums] = useState([]);
	const [user, setUser] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const [songs, setSongs] = useState([]);

	async function fetchUser() {
		try {
			const response = await service.profile();
			setUser(response);
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchSongs() {
		try {
			const response = await service.profile();

			if (!response._id) {
				setSongs([]);
			}
			else {
				const ids = await service.getLikedSongs(response._id);
				const tracks = await Promise.all(
					ids.map(async (songId) => {

						const r = await service.getSong(songId);
						console.log(r);
						if (Object.keys(r).length === 0)  {
							const resp = await spotifyApi.getTrack(songId);
							return resp;
						}

						else {
							return r;
						}

					})
				);
				setSongs(tracks);
			}


		} catch (err) {
			console.error(err);
		}
	}

	async function fetchPlaylists() {
		try {
			const response = await service.profile();

			if (!response._id) {
				setPlaylists([]);
			}
			else {
				const playlists = await service.getPlaylistsForUser(response._id);
				setPlaylists(playlists);
			}


		} catch (err) {
			console.error(err);
		}
	}

	const fetchAlbums = async () => {
		const data = await spotifyApi.getNewReleases({ limit: 10 , country: 'US'});//await spotifyApi.getFeaturedPlaylists({ limit: 10 , country: 'US'});
		const createdData = await service.getSortedAlbums();
		setAlbums([...createdData, ...data.albums.items]);
	}


	async function fetchCreatedAlbums() {
		try {
			const response = await service.profile();

			if (!response._id || response.userType !== "artist") {
				setCreatedAlbums([]);
			}
			else {
				const createdAlbums = await service.getAlbumsForUser(response._id);
				setCreatedAlbums(createdAlbums);
			}


		} catch (err) {
			console.error(err);
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
