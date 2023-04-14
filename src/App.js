import './App.css';

import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Home from "./pages/Home";
import MyPlaylists from "./pages/MyPlaylists";
import MyAlbums from "./pages/MyAlbums";
import LikedSongs from "./pages/LikedSongs";
import Search from "./pages/Search";
import MySongsList from './pages/MySongsList';
import MyPlaylistSongsList from "./pages/MyPlaylistSongsList";
import {Provider} from "react-redux";
import store from './redux/store';
import Followers from "./pages/Followers";
import Following from "./pages/Following";
function App() {
  return (
  <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <div className="container">
         <Routes>
             <Route path="/signup" element={<SignUp/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/search" element={<Search/>}/>
             <Route path="/profile" element={<Profile/>}/>
             <Route path="/profile/:userId" element={<Profile/>}/>
             <Route path="/profile/:userId/followers" element={<Followers/>}/>
             <Route path="/profile/:userId/following" element={<Following/>}/>

             <Route path="/profile/edit-profile" element={<EditProfile/>}/>

             <Route path="/collection/tracks" element={<LikedSongs/>}/>
             <Route path="/collection/playlists" element={<MyPlaylists/>}/>

             <Route path="/collection/albums" element={<MyAlbums/>}/>
             <Route path="/*" element={<Home/>}/>
             <Route path="/album/:albumId/songs" element={<MySongsList/>}/>
             <Route path="/playlist/:playlistId/songs" element={<MyPlaylistSongsList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  </Provider>
  );
}

export default App;
