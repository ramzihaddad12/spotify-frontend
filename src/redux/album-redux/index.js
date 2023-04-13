import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from "../../service";

export const fetchCreatedAlbums = createAsyncThunk(
    'albums/fetchAlbums',
    async () => {

        const user = await service.profile();

        if (!user._id || user.userType !== "artist") {
            return [];
        }
        else {
            const createdAlbums = await service.getAlbumsForUser(user._id);
            return createdAlbums;
        }
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCreatedAlbums.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default albumsSlice.reducer;
