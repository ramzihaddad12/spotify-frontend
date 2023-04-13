import { useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../images/white_logo.svg";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";
import * as service from "../../service";

const Sidebar = () => {

	const user = useSelector((state) => state.user);
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



	async function fetchAlbumsInfo() {
		try {
			setUserIsArtist(user.userType === "artist");
			const albums = await service.getAlbumsForUser(user._id);
			setAlbums(albums);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		if (user) {
			fetchAlbumsInfo();
		}
	}, [user])

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
		const response = await service.createPlaylist(user._id, formData);

	};

	const handleAlbumSubmit = async (event) => {
		event.preventDefault();
		const response = await service.createAlbum(user._id, albumData);
	};

	const handleSongSubmit = async (event) => {
		event.preventDefault();
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
					{showAlbumForm && (
						<form onSubmit={handleAlbumSubmit}>
							<label>
								Album Name:
								<input
									type="text"
									name="name"
									value={albumData.name}
									placeholder="Enter album name"
									onChange={handleAlbumInputChange}
								/>
							</label>
							<label>
								Album Image URL:
								<textarea
									name="description"
									placeholder="Enter album image URL"
									value={albumData.url}
									onChange={handleAlbumInputChange}
								/>
							</label>
							<button type="submit">Create Album</button>
						</form>

					)}
					<div
						className={styles.create_playlist_btn}
						onClick={handleCreateSong}
						>
						<AddIcon />
						<span>Create Song</span>
					</div>
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
									placeholder="Enter song name"
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
					<NavLink
						to="/collection/albums"
						className={styles.menu_link}
						activeClassName={styles.active_menu}
					>
						<LibraryMusicIcon />
						<span>My Created Albums</span>
					</NavLink>
				</>
				)
			}


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
							placeholder="Enter playlist name"
							onChange={handleInputChange}
						/>
					</label>
					<button type="submit">Create Playlist</button>
				</form>

			)}
		</div>
	);
};

export default Sidebar;
