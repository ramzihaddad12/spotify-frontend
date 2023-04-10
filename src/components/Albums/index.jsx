import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Album from "../Album";
import styles from "./styles.module.scss";

const Albums = ({albums}) => {

    return (
            <>
                {Object.keys(albums).length !== 0 && (
                    <div className={styles.results_container}>
                        <Row className= "mx-2 row row-cols-4">
                            {albums.map((album, i) => (
                                <Album album={album} />

                            ))}
                        </Row>
                    </div>
                )}
            </>
    );
};

export default Albums;
