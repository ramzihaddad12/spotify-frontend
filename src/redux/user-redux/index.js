import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const response = await service.profile();
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default userSlice.reducer;
