import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { profileReducer } from "./profile/profileSlice";
import { linksReducer } from "./links/linksSlice";

import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const reducer = combineReducers({
  auth: persistedReducer,
  profile: profileReducer,
  links: linksReducer,
});
