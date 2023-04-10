import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentSong } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Song = ({ song, playlist, handleRemoveSong, img}) => {
	const [menu, setMenu] = useState(false);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();

	function formatTime(milliseconds) {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
		return `${minutes}:${formattedSeconds}`;
	}



	const handleChange = () => {
		if (currentSong && currentSong.action === "play") {
			const payload = {
				song: song,
				action: "pause",
			};
			// dispatch(setCurrentSong(payload));
		} else {
			const payload = {
				song: song,
				action: "play",
			};
			// dispatch(setCurrentSong(payload));
		}
	};

	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton onClick={handleChange} className={styles.play_btn}>
					{currentSong &&
					currentSong.action === "play" &&
					currentSong.song.id === song.id ? (
						<PauseIcon />
					) : (
						<PlayArrowIcon />
					)}
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
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
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
