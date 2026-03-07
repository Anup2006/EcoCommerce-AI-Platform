import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import aiProductMetadataReducer from './aiProductMetadataSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        productMetadata: aiProductMetadataReducer, 
    },
})