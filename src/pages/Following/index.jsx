import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from "../styles.module.scss";
import * as service from "../../service";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";
import {getFollowingAllForUser} from "../../service";

function Following() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState([]);

    const { userId } = useParams();

    async function getFollowing() {
        try {
            console.log("getFollowing")
            const response = await service.getFollowingAllForUser(userId);
            console.log(response)

            setFollowing(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function getUser() {
        console.log("following")
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
                await getFollowing();
            }

        }

        fetchData()

    }, [user]);

    return (
        <div className={styles.liked_songs_container}>
            <Navbar/>
            <UserList users={following} />
        </div>
    );
}

export default Following;

