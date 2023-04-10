import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import spotifyApi from "../../globals";
import Navbar from "../../components/Navbar"
import * as service from "../../auth-service";
import AlbumSongsList from "../../components/AlbumSongsList";
import { useParams } from "react-router-dom";
const MySongsList = () => {
    const [songs, setSongs] = useState([]);
    const [img, setImg] = useState('');
    const { albumId } = useParams();



    async function fetchSongs() {
        const r = await service.getAlbum(albumId);
        if (Object.keys(r).length === 0)  {
            // make a request to get the album details, including the tracklist
            spotifyApi.getAlbum(albumId)
                .then((response) => {
                    setImg(response.images[0].url);
                    setSongs(response.tracks.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        else {
            const response = await service.getAlbum(albumId);
            setImg(response.images[0].url);

            const response2 = await service.getAlbumSongs(albumId);
            setSongs(response2);
        }
    }


    useEffect(() => {
        async function fetchData() {
            await fetchSongs();
        }
        fetchData();

    }, []);

    return (
        <div className={styles.liked_songs_container}>
            <Navbar/>
            <AlbumSongsList songs={songs} img={img}/>
        </div>
    );
};

export default MySongsList;



