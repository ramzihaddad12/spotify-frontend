import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './styles.module.scss'
import * as service from "../../auth-service";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "../../components/Navbar";
import LikedSongsList from "../../components/SongsList";
import Playlists from "../../components/Playlists";
import Albums from "../../components/Albums";
import spotifyApi from "../../globals";


function Profile() {
    const navigate = useNavigate();
    const [AmFollowing, setAmFollowing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers]= useState([]);
    const [createdAlbums, setCreatedAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const { userId } = useParams();

    async function fetchUser() {
        try {
            const response = await service.profile();
            setCurrentUser(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function getFollowing() {
        console.log("getFollowing");
        console.log(user);

        try {
            const response = await service.getFollowingForUser(user._id);
            setFollowing(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function getFollowers() {
        console.log("getFollowers");
        console.log(user);
        try {
            const response = await service.getFollowersForUser(user._id);
            setFollowers(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchSongs() {
        try {

            if (!user._id) {
                setSongs([]);
            }
            else {
                const ids = await service.getLikedSongs(user._id);
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

    async function fetchPlaylists() {
        try {
            if (!user._id) {
                setPlaylists([]);
            }
            else {
                const playlists = await service.getPlaylistsForUser(user._id);
                setPlaylists(playlists);
            }


        } catch (err) {
            console.error(err);
        }
    }

    async function fetchCreatedAlbums() {
        try {
            if (!user._id || user.userType !== "artist") {
                setCreatedAlbums([]);
            }
            else {
                const createdAlbums = await service.getAlbumsForUser(user._id);
                setCreatedAlbums(createdAlbums);
            }


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

    async function fetchAmFollowing() {
        console.log("fetchh am following");
        console.log(currentUser._id);
        console.log(user._id);
        try {
            const response = await service.checkFollow(currentUser._id, user._id);
            setAmFollowing(response.message);
        } catch (err) {
            console.error(err);
        }

    }

    const handleFollow = async () => {
        try {
            const response = await service.followUser(currentUser._id, user._id);
            setAmFollowing(!AmFollowing);
        } catch (err) {
            console.error(err);
        }
    }

    const handleEdit = () => {
        navigate('/profile/edit-profile');
    };

    useEffect(() => {
        async function fetchData() {
            await getUser();
            await fetchUser();
        }

        fetchData();

    }, []);


    useEffect(() => {
        async function fetchData() {
            if (user) {
                await getFollowers();
                await getFollowing();
                await fetchSongs();
                await fetchCreatedAlbums();
                await fetchPlaylists();
            }

        }

        fetchData();

    }, [user]);

    useEffect(() => {
        async function fetchData() {
            if (user && currentUser) {
                await fetchAmFollowing();
            }

        }

        fetchData();

    }, [user, currentUser]);

    return (
        <div>
        <Navbar/>
        <div className={styles.profile_container}>
            <div className={styles.image_container}>
                <img className={styles.circular_image} src="https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo" alt="Profile" />
            </div>

            <div>
                {/*<button onClick={handleBack} className="float-left btn"><i className="float-left fa fa-arrow-left" ></i></button>*/}
            </div>

            <div className={styles.mg_left}>
                <span><b>{user ? user.name : "Loading..."}</b></span>
                <p>{user ? user.email : "Loading..."}</p>
                <div>
                    <div>
                        <b>{following.length}</b> Following
                        <b className={styles.mg_small_left}>{followers.length}</b> Followers

                    </div>
                </div>
            </div>
        </div>
        {!userId ? (
            <button onClick={handleEdit} className="btn btn-light border-primary rounded-pill float-end">
                <b>Edit Profile</b>
            </button>
        ) : (
            AmFollowing ? (
                <button onClick={handleFollow} className="btn btn-light border-primary rounded-pill float-end">
                    <b>Unfollow</b>
                </button>
            ) : (
                <button onClick={handleFollow} className="btn btn-light border-primary rounded-pill float-end">
                    <b>Follow</b>
            </button>
            )
        )}


        <div className={styles.rest_container}>
            {user && !userId && (
                <div>
                    <h2>Your Liked Songs</h2>
                    <LikedSongsList songs={songs}/>
                </div>
            )}

            {user && (
                <div>
                    <h2>Your Playlists</h2>
                    <Playlists playlists={playlists}/>
                </div>
            )}

            {user && user.userType === "artist" &&(
                <div>
                    <h2>Your Created Albums</h2>
                    <Albums albums={createdAlbums}/>

                </div>
            )}
        </div>
        </div>
    );
}

export default Profile;

