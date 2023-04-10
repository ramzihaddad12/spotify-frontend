import styles from "./styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment} from "react";
import Song from "../Song";
import React from "react";

const SongsList = ({songs}) => {

	return (
		<>
		    {songs.length !== 0 && (
                <div className={styles.songs_container}>
                    {songs.map((song) => (
                        <Fragment key={song.id}>

                            <Song song={song} img={song.album.images[0].url}/>
                        </Fragment>
                    ))}
                </div>
            )}
		</>
	);
};

export default SongsList;
