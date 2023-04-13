import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-redux';
import playlistReducer from './playlist-redux';
import albumReducer from './album-redux';
import songReducer from './song-redux';


const store = configureStore({
    reducer: {
        user: userReducer,
        playlists: playlistReducer,
        albums: albumReducer,
        songs: songReducer,
    },
});

export default store;