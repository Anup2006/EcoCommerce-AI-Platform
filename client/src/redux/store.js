import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import aiProductMetadataReducer from './aiProductMetadataSlice.js';
import chatReducer from "./aiChatbotSlice.js";
import orderReducer from "./orderSlice.js";
import logReducer from "./aiLogSlice.js";
import dashboardReducer from "./dashboardSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        productMetadata: aiProductMetadataReducer, 
        chat: chatReducer,
        orders: orderReducer,
        logs: logReducer,
        dashboard:dashboardReducer,
    },
})