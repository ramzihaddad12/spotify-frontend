import { useState , useEffect } from "react";
import Album from "../../components/Album";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import spotifyApi  from '../../globals.js';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {getSearchedAlbums} from "../../service";


const Search = () => {
	const [search, setSearch] = useState("");
	const [albums, setAlbums] = useState([]);

	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const savedAlbums = localStorage.getItem("searchedAlbums");
		if (savedAlbums) {
			setAlbums(JSON.parse(savedAlbums));
		}
		const savedQuery = localStorage.getItem("searchedQuery");
		if (savedQuery) {
			setSearch(savedQuery);
		}

	}, []);

	const handleSearchByArtistName = async (artistName) => {
		setIsFetching(true);
		let apiResults = [];
		try {
			const response = await spotifyApi.searchArtists(artistName);
			const artistId = response.artists.items[0].id;
			const albumsResponse = await spotifyApi.getArtistAlbums(artistId);
			apiResults = albumsResponse.items;
			console.log(apiResults);
		} catch (err) {
			console.log(err);
		} finally {
			const localResults = await getSearchedAlbums(artistName);
			console.log("localResults", localResults);
			const uniqueAlbums = [...new Set([...localResults, ...apiResults])];
			setAlbums(uniqueAlbums);
			localStorage.setItem("searchedAlbums", JSON.stringify(uniqueAlbums));
			localStorage.setItem("searchedQuery", artistName);
			setIsFetching(false);
		}
	};

	const handleSearch = async ({ currentTarget: input }) => {
		handleSearchByArtistName(input.value);
		setSearch(input.value);
	};

	const handleClearSearch = () => {
		setSearch("");
		setAlbums([]);
		localStorage.removeItem("searchedAlbums");
	};

	return (
		<div className={styles.container}>
		<Sidebar/>
		<Navbar/>

		<div className={styles.content}>

			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for artists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={handleClearSearch}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{Object.keys(albums).length !== 0 && (
				<div className={styles.results_container}>
					<Row className= "mx-2 row row-cols-4">
					{albums.map((album, i) => (
								<Album album={album} />

					))}
					</Row>
				</div>
			)}
		</div>
		</div>
	);
};

export default Search;
