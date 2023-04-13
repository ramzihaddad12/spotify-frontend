import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from "../../service";
import {fetchUser} from "../user-redux";

export const fetchPlaylists = createAsyncThunk(
    'playlists/fetchPlaylists',
    async () => {
      const user = await service.profile();

      if (!user._id) {
        return [];
      } else {
        const playlists = await service.getPlaylistsForUser(user._id);
        return playlists;
      }
    }
);

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
          return action.payload;
      });
  },
});

export default playlistsSlice.reducer;
