import {Fragment, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../images/white_logo.svg";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";
import * as service from "../../auth-service";
import {createPlaylist} from "../../auth-service";

const Sidebar = () => {
	const { playlists, getPlayListProgress, createPlayListProgress } =
		useSelector((state) => state.playlists);
	const [user, setUser] = useState(null);
	const [userIsArtist, setUserIsArtist] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showAlbumForm, setShowAlbumForm] = useState(false);
	const [showSongForm, setShowSongForm] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
	});
	const [albumData, setAlbumData] = useState({
		name: '',
		url: 'https://static.thenounproject.com/png/17849-200.png',
	});

	const [songData, setSongData] = useState({
		name: '',
		duration_ms: 0,
	});
	const [albums, setAlbums] = useState([]);



	async function fetchUser() {
		try {
			const response = await service.profile();
			setUser(response);
			setUserIsArtist(response.userType === "artist");
			const albums = await service.getAlbumsForUser(response._id);
			setAlbums(albums);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		fetchUser();
	}, [])

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleAlbumInputChange = (event) => {
		const { name, value } = event.target;
		setAlbumData({
			...albumData,
			[name]: value,
		});
	};

	const handleSongInputChange = (event) => {
		const { name, value } = event.target;
		setSongData({
			...songData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(user._id);
		console.log(formData);
		const response = await service.createPlaylist(user._id, formData);
		console.log(response);

	};

	const handleAlbumSubmit = async (event) => {
		event.preventDefault();
		const response = await service.createAlbum(user._id, albumData);
	};

	const handleSongSubmit = async (event) => {
		event.preventDefault();
		console.log(songData);
		const response = await service.createSong(user._id, songData);
	};

	const handleCreatePlayList = () => {
		setShowForm(!showForm);
	};

	const handleCreateAlbum = () => {
		setShowAlbumForm(!showAlbumForm);
	};

	const handleCreateSong = () => {
		setShowSongForm(!showSongForm);
	};

	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<HomeIcon />
				<span>Home</span>
			</NavLink>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>Your Library</span>
			</NavLink>

			<NavLink
				to="/collection/tracks"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<img src={likeImg} alt="jfo" />
				<span>Liked Songs</span>
			</NavLink>
			{userIsArtist && (
				<>
					<div
						className={styles.create_playlist_btn}
						onClick={handleCreateAlbum}
					>
						<AddIcon />
						<span>Create Album</span>
					</div>
					<div
						className={styles.create_playlist_btn}
						onClick={handleCreateSong}
						>
						<AddIcon />
						<span>Create Song</span>
					</div>
				</>
				)
			}


			{userIsArtist && (

				<NavLink
				to="/collection/albums"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
				>
				<LibraryMusicIcon />
				<span>My Created Albums</span>
				</NavLink>
				)
			}

			{showAlbumForm && (
				<form onSubmit={handleAlbumSubmit}>
					<label>
						Album Name:
						<input
							type="text"
							name="name"
							value={albumData.name}
							onChange={handleAlbumInputChange}
						/>
					</label>
					<label>
						Album Image URL:
						<textarea
							name="description"
							value={albumData.url}
							onChange={handleAlbumInputChange}
						/>
					</label>
					<button type="submit">Create Album</button>
				</form>

			)}

			{showSongForm && (
				<form onSubmit={handleSongSubmit}>
					<label>
						Album:
							<select
								id="album-select"
								name="albumId"
								value={songData.albumId}
								onChange={handleSongInputChange}
							>
								<option value="">-- Please select an album --</option>
								{albums.map((album) => (
									<option key={album.id} value={album.id}>
										{album.name}
									</option>
								))}
							</select>
						Song Name:
						<input
							type="text"
							name="name"
							value={songData.name}
							onChange={handleSongInputChange}
						/>
						Song Duration:
						<input
							type="number"
							name="duration_ms"
							value={songData.duration_ms}
							onChange={handleSongInputChange}
						/>
					</label>
					<button type="submit">Create Song</button>
				</form>

			)}


			{user && <div
				className={styles.create_playlist_btn}
				onClick={handleCreatePlayList}
			>
				<AddIcon/>
				<span>Create Playlist</span>
			</div>}

			{showForm && (
				<form onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
						/>
					</label>
					{/*<label>*/}
					{/*	Description:*/}
					{/*	<textarea*/}
					{/*		name="description"*/}
					{/*		value={formData.description}*/}
					{/*		onChange={handleInputChange}*/}
					{/*	/>*/}
					{/*</label>*/}
					<button type="submit">Create Playlist</button>
				</form>

			)}
			<div className={styles.underline}></div>
			{getPlayListProgress || createPlayListProgress ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="3rem" />
				</div>
			) : (
				<Fragment>
					{playlists.map((playlist) => (
						<NavLink
							key={playlist._id}
							to={`/playlist/${playlist._id}`}
							activeClassName={styles.active_link}
							className={styles.playlist_link}
						>
							{playlist.name}
						</NavLink>
					))}
				</Fragment>
			)}
		</div>
	);
};

export default Sidebar;
