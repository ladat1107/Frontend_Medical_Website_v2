import { combineReducers } from '@reduxjs/toolkit';
// Import reducer từ slice
import authenSlice from './authenSlice';
import appSlice from './appSlice';

const reducers = combineReducers({
    authen: authenSlice,
    app: appSlice
});

export default reducers;
