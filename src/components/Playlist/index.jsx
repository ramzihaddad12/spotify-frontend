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
