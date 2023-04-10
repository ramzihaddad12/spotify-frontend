// import { Fragment } from "react";
// import { Link } from "react-router-dom";
// import styles from "./styles.module.scss";
//
// const Playlist = ({ playlists }) => {
// 	return (
// 		<Fragment>
// 			{playlists.map((playlist) => (
// 				<Link key={playlist._id} to={`/playlist/${playlist._id}`}>
// 					<div className={styles.playlist}>
// 						{playlist.img === "" ? (
// 							<img
// 								src="https://static.thenounproject.com/png/17849-200.png"
// 								alt={playlist.name}
// 								style={{ background: "#919496" }}
// 							/>
// 						) : (
// 							<img src={playlist.img} alt={playlist.name} />
// 						)}
// 						<p>{playlist.name}</p>
// 						<span>{playlist.description}</span>
// 					</div>
// 				</Link>
// 			))}
// 		</Fragment>
// 	);
// };

// export default Playlist;

import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Playlist = ({ playlist }) => {
	const navigate = useNavigate();

	function onClick({playlist} ) {
		navigate(`/playlist/${playlist._id}/songs`);
	}

	return (
		<Card style={{ width: '250px', height: '300px'}} onClick={() => onClick({playlist})}>
			<Card.Img src="https://static.thenounproject.com/png/17849-200.png"/>
			<Card.Body>
				<Card.Title>{playlist.name}</Card.Title>
			</Card.Body>
		</Card>
	);
};

export default Playlist;
