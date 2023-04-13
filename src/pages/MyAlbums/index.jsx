import {useEffect, useState} from "react";
import styles from "../styles.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/Navbar";
import * as service from "../../service";
import Sidebar from "../../components/Sidebar";
import Albums from "../../components/Albums";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const MyAlbums = () => {
    const albums = useSelector((state) => state.albums);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();



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
