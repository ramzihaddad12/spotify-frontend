import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import Navbar from "../../components/Navbar"
import * as service from "../../service";
import SongsList from "../../components/SongsList";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from "../../redux/user-redux";
import {fetchSongs} from "../../redux/song-redux";

const LikedSongs = () => {
    const songs = useSelector((state) => state.songs);
    const user = useSelector((state) => state.user);


    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, navigate]);



    return (
                <div className={styles.liked_songs_container}>
                    <Navbar/>
                    <SongsList songs={songs} />
                </div>
    );
};

export default LikedSongs;
