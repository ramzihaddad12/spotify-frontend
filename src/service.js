import axios from "axios";

const BASE_REACT_SPOTIFY_URL = "https://spotify-backend-6gqo.onrender.com/api"//process.env.BASE_REACT_SPOTIFY_URL || "http://localhost:4000/api"
//"http://localhost:4000/api" //
const SECURITY_API = `${BASE_REACT_SPOTIFY_URL}/users`;
const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${SECURITY_API}/signup`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${SECURITY_API}/login`, user)
        .then(response => response.data);

export const logout = () =>
    api.get(`${SECURITY_API}/logout`)
        .then(response => response.data);

export const likeSong = (userId, songId) =>
    api.post(`${SECURITY_API}/${userId}/likeSong`, {songId})
        .then(response => response.data);

export const checkIfUserLikedSong = (userId, songId) =>
    api.get(`${SECURITY_API}/${userId}/checkLike/${songId}`)
        .then(response => response.data);

export const getLikedSongs = (userId) =>
    api.get(`${SECURITY_API}/${userId}/likedSongs`)
        .then(response => response.data);

export const getUsersLikedSong = (songId) =>
    api.get(`${SECURITY_API}/${songId}/usersLikedSong`)
        .then(response => response.data);

export const getNumOfLikes = (songId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/likes/${songId}/numOflikes`)
        .then(response => response.data);

export const profile = () =>
    api.get(`${SECURITY_API}/profile`)
        .then(response => response.data);

export const getUser = (userId) =>
    api.get(`${SECURITY_API}/get/${userId}`)
        .then(response => response.data);

export const createPlaylist = (userId, playlist) =>
    api.post(`${BASE_REACT_SPOTIFY_URL}/playlists/${userId}`, playlist)
        .then(response => response.data);

export const getPlaylistsForUser = (userId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/playlists/${userId}`)
        .then(response => response.data);

export const addSongInPlaylist = (playlistId, songId) =>
    api.put(`${BASE_REACT_SPOTIFY_URL}/playlists/add/${playlistId}`, {songId})
        .then(response => response.data);

export const removeSongFromPlaylist = (playlistId, songId) =>
    api.put(`${BASE_REACT_SPOTIFY_URL}/playlists/remove/${playlistId}`, {songId})
        .then(response => response.data);
export const getSongIdsInPlaylist = (playlistId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/playlists/${playlistId}/songIds`)
        .then(response => response.data);

export const createAlbum = (userId, album) =>
    api.post(`${BASE_REACT_SPOTIFY_URL}/albums/${userId}`, album)
        .then(response => response.data);
export const getAlbumsForUser = (userId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/albums/user/${userId}`)
        .then(response => response.data);

export const getSortedAlbums = () =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/albums/sorted`)
        .then(response => response.data);

export const getSearchedAlbums = (query) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/albums/search/?name=${query}`)
        .then(response => response.data);
export const getAlbumSongs = (albumId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/albums/songs/${albumId}`)
        .then(response => response.data);

export const getAlbum = (albumId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/albums/${albumId}`)
        .then(response => response.data);

export const createSong = (userId, songData) =>
    api.post(`${BASE_REACT_SPOTIFY_URL}/songs/${userId}`, songData)
        .then(response => response.data);

export const getSong = (songId) =>
    api.get(`${BASE_REACT_SPOTIFY_URL}/songs/check/${songId}`)
        .then(response => response.data);

export const followUser = (userId, followId) =>
    api.post(`${SECURITY_API}/${userId}/follow`, {followId})
        .then(response => response.data);

export const getFollowingForUser = (userId) =>
    api.get(`${SECURITY_API}/following/${userId}`)
        .then(response => response.data);

export const getFollowersForUser = (userId) =>
    api.get(`${SECURITY_API}/followers/${userId}`)
        .then(response => response.data);

export const getFollowingAllForUser = (userId) =>
    api.get(`${SECURITY_API}/following/all/${userId}`)
        .then(response => response.data);

export const getFollowersAllForUser = (userId) =>
    api.get(`${SECURITY_API}/followers/all/${userId}`)
        .then(response => response.data);

export const checkFollow = (userId, followId) =>
    api.get(`${SECURITY_API}/${userId}/checkFollow/${followId}`)
        .then(response => response.data);

export const updateUser = (userId, data) =>
    api.put(`${SECURITY_API}/update/${userId}`, data)
        .then(response => response.data);

