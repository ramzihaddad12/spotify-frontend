import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Song = ({ song, playlist, handleRemoveSong, img}) => {
	const [menu, setMenu] = useState(false);
	const [audio, setAudio] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const user = useSelector((state) => state.user);

	function formatTime(milliseconds) {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
		return `${minutes}:${formattedSeconds}`;
	}

	function handlePlayButtonClick() {
		if (!audio) {
			const audioElement = new Audio(song.preview_url);
			setAudio(audioElement);
			audioElement.play();
			setIsPlaying(true);
		} else {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				audio.play();
				setIsPlaying(true);
			}
		}
	}


	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton onClick={handlePlayButtonClick} className={styles.play_btn}>
					{!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
				</IconButton>
				<img src={img} alt="song_img" />
				<p>{song.name}</p>
			</div>
			<div className={styles.center}>
				<p>{song.artists[0].name}</p>
			</div>
			<div className={styles.right}>
				<Like songId={song.id}/>

				<p>{formatTime(song.duration_ms)}</p>
				{ user && (
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				)}
				{menu && (
					<PlaylistMenu
						playlist={playlist}
						song={song}
						handleRemoveSong={handleRemoveSong}
						closeMenu={() => setMenu(false)}
					/>
				)} 
			</div>
		</div>
	);
};

export default Song;
