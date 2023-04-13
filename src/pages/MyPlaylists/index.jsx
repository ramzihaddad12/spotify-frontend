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


const MyPlaylists = () => {
    const user = useSelector((state) => state.user);
    const playlists = useSelector((state) => state.playlists);
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [isFetchingData, setIsFetchingData] = useState(true);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPlaylists());
    }, [dispatch]);

    useEffect(() => {
        if (!isFetchingData && !user) {
            navigate('/login');
        }
    }, [isFetchingData, user]);

    useEffect(() => {
        if (user && playlists) {
            setIsFetchingData(false);
        }
    }, [user, playlists]);


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
