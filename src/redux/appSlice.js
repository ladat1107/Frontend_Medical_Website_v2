import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

export const appSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        startLoading: (state, action) => {
            state.isLoading = true;
        },
        endLoading: (state, action) => {
            state.isLoading = false;
        },
    },
});

// Export các action để sử dụng trong component
export const { startLoading, endLoading } = appSlice.actions;

// Export reducer để sử dụng trong store
export default appSlice.reducer;
