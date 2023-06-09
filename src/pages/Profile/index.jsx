import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styles from './styles.module.scss'
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
import logo from "../../images/spotify-logo.png";

function Profile() {
    const navigate = useNavigate();
    const [AmFollowing, setAmFollowing] = useState(false);
    const currentUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers]= useState([]);
    const [createdAlbums, setCreatedAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const { userId } = useParams();

    async function getFollowing() {
        try {
            const response = await service.getFollowingForUser(user._id);
            setFollowing(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function getFollowers() {
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
                setIsCurrentUser(userId === currentUser._id);

            } catch (err) {
                console.error(err);
            }
        }
        else {
            try {
                const response = await service.profile();
                setUser(response);
                setIsCurrentUser(response._id === currentUser._id);

            } catch (err) {
                console.error(err);
            }
        }


    }

    async function fetchAmFollowing() {
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

    function navigateToFollowing() {
        navigate(`/profile/${user._id}/following`);
    }

    function navigateToFollowers() {
        navigate(`/profile/${user._id}/followers`);
    }

    useEffect(() => {
        async function fetchData() {
            await getUser();
        }

        fetchData();

        console.log("currentUser");
        console.log(currentUser);

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
                <img className={styles.circular_image} src={logo} alt="Profile" />
            </div>

            <div>
                {/*<button onClick={handleBack} className="float-left btn"><i className="float-left fa fa-arrow-left" ></i></button>*/}
            </div>

            <div className={styles.mg_left}>
                <span><b>{user ? user.name : "Loading..."}</b></span>
                <p>{user ? user.email : "Loading..."}</p>
                <div>
                    <div>
                        <a onClick={navigateToFollowing}>
                            <b>{following.length}</b> Following
                        </a>
                        <a onClick={navigateToFollowers}>
                            <b className={styles.mg_small_left}>{followers.length}</b> Followers
                        </a>

                    </div>
                </div>
            </div>
        </div>
        {isCurrentUser? (
            <button onClick={handleEdit} className="btn btn-light border-primary rounded-pill float-end">
                <b>Edit Profile</b>
            </button>
        ) : ( currentUser &&
            (
            AmFollowing ? (
                <button onClick={handleFollow} className="btn btn-light border-primary rounded-pill float-end">
                    <b>Unfollow</b>
                </button>
            ) : (
                <button onClick={handleFollow} className="btn btn-light border-primary rounded-pill float-end">
                    <b>Follow</b>
            </button>
            )
            )
        )}


        <div className={styles.rest_container}>
            {isCurrentUser && (
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

