import { combineReducers } from '@reduxjs/toolkit';
import { serverApi } from '../services/server.api';

export default combineReducers({
  [serverApi.reducerPath]: serverApi.reducer,
});
