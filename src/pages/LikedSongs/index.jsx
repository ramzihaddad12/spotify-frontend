import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import spotifyApi from "../../globals";
import Navbar from "../../components/Navbar"
import * as service from "../../auth-service";
import SongsList from "../../components/SongsList";
import {useNavigate} from "react-router-dom";
const LikedSongs = () => {
    const [songs, setSongs] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    async function fetchUser() {
        try {
            const response = await service.profile();
            setUser(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchSongs() {
        try {
            const response = await service.profile();

            if (!response._id) {
                setSongs([]);
            }
            else {
                const ids = await service.getLikedSongs(response._id);
                const tracks = await Promise.all(
                    ids.map(async (songId) => {

                        const r = await service.getSong(songId);
                        console.log(r);
                        if (Object.keys(r).length === 0)  {
                            const resp = await spotifyApi.getTrack(songId);
                            return resp;
                        }

                        else {
                            return r;
                        }

                    })
                );
                setSongs(tracks);
            }


        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await fetchUser();
            await fetchSongs();
        }
        fetchData();

    }, []);

    return (
        <>
            {user ? (
                <div className={styles.liked_songs_container}>
                    <Navbar/>
                    <SongsList songs={songs} />
                </div>
            ) : (
                navigate("/login")
            )}
        </>
    );
};

export default LikedSongs;
