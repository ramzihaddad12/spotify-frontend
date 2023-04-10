import styles from "./styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment} from "react";
import Song from "../Song";
const AlbumSongsList = ({songs, img}) => {
	return (
        <>
            {songs.length !== 0 && (
                <div className={styles.songs_container}>
                    {songs.map((song) => (
                        <Fragment key={song.id}>
                            <Song song={song} img={img}/>
                        </Fragment>
                    ))}
                </div>
            )}
        </>
	);
};

export default AlbumSongsList;
