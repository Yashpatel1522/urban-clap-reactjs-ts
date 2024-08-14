import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducer/profile";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import credentialsSlice from "../reducer/userdata";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "counter",
  storage,
  blacklist: ["user"],
  whitelist: ["credentials"],
};
const reducers = combineReducers({
  credentials: credentialsSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(Store);
