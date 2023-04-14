import {useEffect, useState} from "react";
import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/Navbar";
import * as service from "../../service";
import Sidebar from "../../components/Sidebar";
import Playlists from "../../components/Playlists";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../redux/user-redux";
import {fetchPlaylists} from "../../redux/playlist-redux";
import {fetchSongs} from "../../redux/song-redux";


const MyPlaylists = () => {
    const user = useSelector((state) => state.user);
    const playlists = useSelector((state) => state.playlists);
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [userLoaded, setUserLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchUser())
            .then(() => {
                setUserLoading(true);
            });
        dispatch(fetchPlaylists())
    }, []);


    useEffect(() => {
        if (userLoaded && !user) {
            navigate('/login');
        }
    }, [user, userLoaded]);



    return (
            <div className={styles.playlist_container}>
                <Sidebar/>
                <Navbar/>
                <div className={styles.content}>
                    <Playlists playlists={playlists}/>
                </div>
            </div>
    );
};

export default MyPlaylists;
