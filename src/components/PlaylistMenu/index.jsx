import {Fragment, useEffect, useState} from "react";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";
import * as service from "../../service";

const PlaylistMenu = ({ playlist, song, handleRemoveSong, closeMenu }) => {
	const [playlists, setPlaylists] = useState([]);
	const [playlistToAddComponents, setPlaylistToAddComponents] = useState([]);

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

	const [user, setUser] = useState(null);
	async function fetchUser() {
		try {
			const response = await service.profile();
			console.log(response);
			setUser(response);

			console.log(response);
			const responsei = await service.getPlaylistsForUser(response._id);
			console.log(responsei);
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



	const handleRemoveFromPlaylist = async (playlistId, songId) => {
		console.log("Removing");
		console.log(songId);
		const response = await service.removeSongFromPlaylist(playlistId, songId);
		console.log(response);
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
				<div className={styles.playlist_option}>
					<p>Remove from Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists}>
							{playlistToRemoveComponents}
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
