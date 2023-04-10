import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Album = ({ album }) => {   
    const navigate = useNavigate();

    function onClick({album} ) {
        navigate(`/album/${album.id}/songs`);
    }

	return (
        <Card style={{ width: '240px', height: '300px'}}onClick={() => onClick({album})}>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
            </Card.Body>
        </Card>
	);
};

export default Album;