import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri =import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/chatbot`;

const sendMessage = createAsyncThunk(
  "chatbot/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {

      const res = await axios.post(
        `${BACKEND_URL}/chat`,
        messageData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || err.message
      );

    }
  }
);

const getConversationLogs = createAsyncThunk(
  "chatbot/getConversationLogs",
  async (_, { rejectWithValue }) => {

    try {

      const res = await axios.get(
        `${BACKEND_URL}/logs`
      );

      return res.data.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || err.message
      );

    }

  }
);

const initialState = {

  messages: [],
  logs: [],
  loading: false,
  error: null,
};

export const aiChatbotSlice = createSlice({

  name: "aiChatbot",
  initialState,

  reducers: {

    addUserMessage(state, action) {
      state.messages.push(action.payload);
    },

    clearChat(state) {
      state.messages = [];
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {

        state.loading = false;

        state.messages.push({
          sender: "ai",
          text: action.payload.data.reply,
        });

      })

      .addCase(sendMessage.rejected, (state, action) => {

        state.loading = false;
        state.error =
          action.payload?.message || "AI response failed";

      })

      .addCase(getConversationLogs.pending, (state) => {
        state.loading = true;
      })

      .addCase(getConversationLogs.fulfilled, (state, action) => {

        state.loading = false;
        state.logs = action.payload;

      })

      .addCase(getConversationLogs.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to fetch logs";

      });

  },

});

export const { addUserMessage, clearChat } =aiChatbotSlice.actions;
export { sendMessage, getConversationLogs };
export default aiChatbotSlice.reducer;