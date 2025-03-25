import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    content: [{ sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }],
    chatLoading: false
};
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setChatLoading: (state, action) => {
            state.chatLoading = action.payload;
        },
        clearContent: (state) => {
            state.content = [{ sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }];
        }
    },
});

// Export các action để sử dụng trong component
export const { setContent, setChatLoading, clearContent } = chatSlice.actions;

// Export reducer để sử dụng trong store
export default chatSlice.reducer;
