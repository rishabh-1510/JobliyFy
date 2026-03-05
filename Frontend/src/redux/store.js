import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import jobSlice from './jobSlice'
import { createRoot } from 'react-dom/client'
import companySlice from './companySlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import applicationslice from "./applicationslice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    auth: authSlice,
    job:jobSlice,
    company:companySlice,
    application:applicationslice, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
