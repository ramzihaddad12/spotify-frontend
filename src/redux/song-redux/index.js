import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from "../../service";
import spotifyApi from "../../globals";

export const fetchSongs = createAsyncThunk(
    'songs/fetchSongs',
    async () => {
        try {
            const response = await service.profile();

            if (!response._id) {
                return [];
            }
            else {
                const ids = await service.getLikedSongs(response._id);
                const tracks = await Promise.all(
                    ids.map(async (songId) => {

                        const r = await service.getSong(songId);
                        if (Object.keys(r).length === 0)  {
                            const resp = await spotifyApi.getTrack(songId);
                            return resp;
                        }

                        else {
                            return r;
                        }

                    })
                );
                return tracks;
            }


        } catch (err) {
            console.error(err);
        }

    }
);

const songsSlice = createSlice({
    name: 'songs',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default songsSlice.reducer;
