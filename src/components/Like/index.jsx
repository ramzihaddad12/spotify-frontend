import { useState, Fragment, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import * as service from "../../auth-service"
import {checkIfUserLikedSong} from "../../auth-service";
import {useNavigate} from "react-router-dom";
const Like = ({ songId }) => {
	const [progress, setProgress] = useState(false);
	const [user, setUser] = useState(null);
	const [liked, setLiked] = useState(false);
	const [numLikes, setNumLikes] = useState(null);
	const navigate = useNavigate();

	async function fetchUser() {
		try {
			const response = await service.profile();
			setUser(response);
			await getLiked(response);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		fetchUser();
	}, []);

	const handleLikeSong = async (userId, songId) => {
		if (!user) {
			navigate('/login');
			return;
		}
		setProgress(true);

		const response = await service.likeSong(userId, songId);
		getLiked(user);


		setProgress(false);
	};


	const getLiked = async (user) => {
		if (!user) {
			setNumLikes(null);
			return;
		}
		const response = await service.checkIfUserLikedSong(user._id, songId);
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
