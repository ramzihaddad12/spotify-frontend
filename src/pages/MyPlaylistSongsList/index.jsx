import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import spotifyApi from "../../globals";
import Navbar from "../../components/Navbar"
import * as service from "../../auth-service";
import SongsList from "../../components/SongsList";

const MyPlaylistSongsList = () => {
    const [songs, setSongs] = useState([]);
    const { playlistId } = useParams();

    async function fetchSongs() {
        const trackIds = await service.getSongIdsInPlaylist(playlistId);
        const tracks = await Promise.all(
            trackIds.map(async (trackId) => {
                const r = await service.getSong(trackId);
                if (Object.keys(r).length === 0)  {
                    const resp = await spotifyApi.getTrack(trackId);
                    return resp;
                }

                else {
                    return r;
                }
            })
        )
        setSongs(tracks);
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
            <SongsList songs={songs} />
        </div>
	);
};

export default MyPlaylistSongsList;
