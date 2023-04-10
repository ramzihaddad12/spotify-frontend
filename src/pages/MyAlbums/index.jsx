import {useEffect, useState} from "react";
import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/Navbar";
import * as service from "../../auth-service";
import Sidebar from "../../components/Sidebar";
import Albums from "../../components/Albums";
import {useNavigate} from "react-router-dom";

const MyAlbums = () => {
    const [albums, setAlbums] = useState([]);
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

    async function fetchAlbums() {
        try {
            const response = await service.profile();

            if (!response._id) {
                setAlbums([]);
            }
            else {
                const albums = await service.getAlbumsForUser(response._id);
                setAlbums(albums);
            }


        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        async function fetchData() {
            await fetchUser();
            await fetchAlbums();
        }
        fetchData();

    }, []);


    return (
        <>
            {user && user.userType === "artist" ? (
                <div className={styles.playlist_container}>
                    <Sidebar/>
                    <Navbar/>
                    <div className={styles.content}>
                        <Albums albums={albums}/>
                    </div>
                </div>
            ) : (
                navigate("/login")
            )}
        </>
    );
};

export default MyAlbums;
