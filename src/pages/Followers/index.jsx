import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from "../styles.module.scss";
import * as service from "../../service";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import LikedSongsList from "../../components/SongsList";
import Playlists from "../../components/Playlists";
import Albums from "../../components/Albums";
import spotifyApi from "../../globals";
import {useSelector} from "react-redux";
import SongsList from "../../components/SongsList";
import UserList from "../../components/UserList";

function Followers() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const [followers, setFollowers]= useState([]);

    const { userId } = useParams();
    async function getFollowers() {
        try {
            const response = await service.getFollowersAllForUser(user._id);
            setFollowers(response);
        } catch (err) {
            console.error(err);
        }
    }
    async function getUser() {
        if (userId) {
            try {
                const response = await service.getUser(userId);
                setUser(response);

            } catch (err) {
                console.error(err);
            }
        }
        else {
            try {
                const response = await service.profile();
                setUser(response);

            } catch (err) {
                console.error(err);
            }
        }


    }
    useEffect(() => {
        async function fetchData() {
            await getUser();
        }

        fetchData();

    }, []);


    useEffect(() => {
        async function fetchData() {
            if (user) {
                await getFollowers();
            }

        }

        fetchData();

        console.log(followers)

    }, [user]);

    return (
        <div className={styles.liked_songs_container}>
            <Navbar/>
            <UserList users={followers} />
        </div>
    );
}

export default Followers;

