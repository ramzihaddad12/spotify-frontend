import {useEffect, useState} from "react";
import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/Navbar";
import * as service from "../../auth-service";
import Sidebar from "../../components/Sidebar";
import Playlists from "../../components/Playlists";
import {useNavigate} from "react-router-dom";


const MyPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function fetchUser() {
        try {
            const response = await service.profile();
            setUser(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchPlaylists() {
        try {
            const response = await service.profile();

            if (!response._id) {
                setPlaylists([]);
            }
            else {
                const playlists = await service.getPlaylistsForUser(response._id);
                setPlaylists(playlists);
            }


        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        async function fetchData() {
            await fetchUser();
            await fetchPlaylists();
        }
        fetchData();

    }, []);


    return (
        <>
            {user ? (
                <div className={styles.playlist_container}>
                    <Sidebar/>
                    <Navbar/>
                    <div className={styles.content}>
                        <Playlists playlists={playlists}/>
                    </div>
                </div>
            ) : (
                navigate("/login")
            )}
        </>
    );
};

export default MyPlaylists;
