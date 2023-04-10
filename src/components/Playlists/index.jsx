import Playlist from "../Playlist";
import styles from "./styles.module.scss";
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Playlists = ({playlists}) => {

    return (
        <>
        {Object.keys(playlists).length !== 0 && (
            <div className={styles.results_container}>
                <Row className= "mx-2 row row-cols-4">
                    {playlists.map((playlist, i) => (
                        <Playlist playlist={playlist} />

                    ))}
                </Row>
            </div>
        )}
        </>
    );
};

export default Playlists;
