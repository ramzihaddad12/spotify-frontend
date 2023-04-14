import { useState, Fragment, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import * as service from "../../service"
import {checkIfUserLikedSong} from "../../service";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../redux/user-redux";
import {fetchPlaylists} from "../../redux/playlist-redux";
import {fetchSongs} from "../../redux/song-redux";

const Like = ({ songId }) => {
	const [progress, setProgress] = useState(false);
	const user = useSelector((state) => state.user);
	const [liked, setLiked] = useState(false);
	const [numLikes, setNumLikes] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const [isFetchingData, setIsFetchingData] = useState(true);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	useEffect(() => {
		if (!isFetchingData && !user) {
			navigate('/login');
		}
	}, [isFetchingData, user]);

	useEffect(() => {
		if (user) {
			setIsFetchingData(false);
		}
	}, [user]);

	useEffect(() => {
		getLiked(user);
	}, []);


	const handleLikeSong = async (userId, songId) => {
		if (!user) {
			navigate('/login');
			return;
		}
		setProgress(true);

		const response = await service.likeSong(userId, songId);
		dispatch(fetchSongs());
		getLiked(user);


		setProgress(false);
	};


	const getLiked = async (user) => {
		if (!user) {
			setNumLikes(null);
			return;
		}
		const response = await service.checkIfUserLikedSong(user._id, songId);
		console.log("getLiked");
		console.log(response.message);

		setLiked(response.message);
		const response2 = await service.getNumOfLikes(songId);
		setNumLikes(response2);
	};

	return (
		<IconButton
			className={styles.like_btn}
			onClick={() => handleLikeSong(user._id, songId)}
		>
			{progress ? (
				<CircularProgress style={{ color: "#1ed760" }} size="2rem" />
			) :
			(
				<Fragment>
					{user && liked ? (
							<FavoriteIcon className={styles.like_filled} />
					) : (
						<FavoriteBorderIcon className={styles.like_outlined} />
					)}

					{numLikes !== null && (
						<p>{numLikes}</p>
					)
					}
				</Fragment>
			)}
		</IconButton>
	);
};

export default Like;
