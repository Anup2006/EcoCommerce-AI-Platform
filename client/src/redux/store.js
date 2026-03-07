import {configureStore} from '@reduxjs/toolkit';
import aiProductMetadataReducer from './aiProductMetadataSlice.js';

export const store = configureStore({
    reducer: {
        productMetadata: aiProductMetadataReducer, 
    },
})