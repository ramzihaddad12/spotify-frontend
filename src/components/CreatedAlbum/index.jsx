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

import {Card, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styles from "../../pages/Search/styles.module.scss";
import Album from "../Album";

const CreatedAlbum = ({ album }) => {
	const navigate = useNavigate();

	function onClick({album} ) {
		navigate(`/created_album/${album._id}/songs`);
	}

	// {Object.keys(albums).length !== 0 && (
	// 	<div className={styles.results_container}>
	// 		<Row className= "mx-2 row row-cols-4">
	// 			{albums.map((album, i) => (
	// 				<Album album={album} />
	//
	// 			))}
	// 		</Row>
	// 	</div>
	// )}

	return (
		<Card style={{ width: '250px', height: '300px'}} onClick={() => onClick({album})}>
			<Card.Img src="https://static.thenounproject.com/png/17849-200.png"/>
			<Card.Body>
				<Card.Title>{album.name}</Card.Title>
			</Card.Body>
		</Card>
	);
};

export default CreatedAlbum;
