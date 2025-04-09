import { combineReducers } from '@reduxjs/toolkit';
// Import reducer từ slice
import authenSlice from './authenSlice';
import appSlice from './appSlice';
import chatSlice from './chatSlice';

const reducers = combineReducers({
    authen: authenSlice,
    app: appSlice,
    chat: chatSlice,
});

export default reducers;
