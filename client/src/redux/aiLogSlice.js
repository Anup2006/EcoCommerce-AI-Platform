import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri =import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/ai-logs`;

const getAILogs = createAsyncThunk(
  "logs/getAILogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}`
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

  logs: [],
  loading: false,
  error: null,

};

export const aiLogsSlice = createSlice({

  name: "aiLogs",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getAILogs.pending, (state) => {

        state.loading = true;

      })

      .addCase(getAILogs.fulfilled, (state, action) => {

        state.loading = false;
        state.logs = action.payload;

      })

      .addCase(getAILogs.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload?.message ||
          "Failed to fetch AI logs";

      });

  },

});

export { getAILogs };

export default aiLogsSlice.reducer;