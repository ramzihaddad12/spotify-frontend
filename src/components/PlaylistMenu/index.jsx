import {Fragment, useEffect, useState} from "react";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";
import * as service from "../../service";
import {getUsersLikedSong} from "../../service";
import {useNavigate} from "react-router-dom";

const PlaylistMenu = ({ playlist, song, handleRemoveSong, closeMenu }) => {
	const [playlists, setPlaylists] = useState([]);
	const [playlistToAddComponents, setPlaylistToAddComponents] = useState([]);
	const [usersWhoLikedSong, setUsersWhoLikedSong] = useState([]);
	const navigate = useNavigate();


	useEffect(() => {
		const promises = playlists.map((playlist) => {
			return songInPlaylist(playlist._id, song.id);
		});

		Promise.all(promises).then((results) => {
			const components = playlists.map((playlist, index) => {
				if (!results[index]) {
					return (
						<div
							className={styles.option}
							onClick={() => handleAddToPlaylist(playlist._id, song.id)}
							key={playlist._id}
						>
							<p>{playlist.name}</p>
						</div>
					);
				}
			});

			setPlaylistToAddComponents(components);
		}).catch((error) => {
			// Handle errors
		});

	}, [playlists, song]);
	const [playlistToRemoveComponents, setPlaylistToRemoveComponents] = useState([]);

	useEffect(() => {
		const promises = playlists.map((playlist) => {
			return songInPlaylist(playlist._id, song.id);
		});

		Promise.all(promises).then((results) => {
			const components = playlists.map((playlist, index) => {
				if (results[index]) {
					return (
						<div
							className={styles.option}
							onClick={() => handleRemoveFromPlaylist(playlist._id, song.id)}
							key={playlist._id}
						>
							<p>{playlist.name}</p>
						</div>
					);
				}
			});
			setPlaylistToRemoveComponents(components);
		}).catch((error) => {
			// Handle errors
		});
	}, [playlists, song]);

	useEffect(() => {
		const fetchData = async () => {
			const users = await service.getUsersLikedSong(song.id);
			const components = users.map((user, index) => {
				if (users[index]) {
					return (
						<div
							className={styles.option}
							onClick={() => handleProfileClick(users[index]._id)}
							key={users[index]._id}
						>
							<p>{user.name}</p>
						</div>
					);
				}
			});
			setUsersWhoLikedSong(components);
		};

		fetchData();
	}, [playlists, song]);

	const [user, setUser] = useState(null);
	async function fetchUser() {
		try {
			const response = await service.profile();
			setUser(response);

			const responsei = await service.getPlaylistsForUser(response._id);
			setPlaylists(responsei);

		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fetchUser();
	}, [])



	const handleAddToPlaylist = async (playlistId, songId) => {
		const response = await service.addSongInPlaylist(playlistId, songId);
		console.log(response);
	};

	const handleProfileClick = async (userId) => {
		navigate(`/profile/${userId}`);
	};
	const handleRemoveFromPlaylist = async (playlistId, songId) => {
		const response = await service.removeSongFromPlaylist(playlistId, songId);
	};
	const songInPlaylist =  async (playlistId, songId) => {
		const resp = await service.getSongIdsInPlaylist(playlistId, songId);
		return resp.includes(songId);
	}



	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={styles.menu} onClick={closeMenu}>
				<div className={styles.playlist_option}>
					<p>Add to Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists}>
							{playlistToAddComponents}
						</div>
					</Fragment>
				</div>
				<div className={styles.playlist_remove_option}>
					<p>Remove from Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists} style={{marginTop: "60px"}}>
							{playlistToRemoveComponents}
						</div>
					</Fragment>
				</div>
				<div className={styles.playlist_likes_option}>
					<p>Who Likes Song</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists} style={{marginTop: "120px"}}>
							{usersWhoLikedSong}
						</div>
					</Fragment>
				</div>
				<div className={styles.option}>
					<p>Go to artist</p>
				</div>
				<div className={styles.option}>
					<p>Share</p>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default PlaylistMenu;
