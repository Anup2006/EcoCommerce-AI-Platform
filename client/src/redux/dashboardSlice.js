import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const base_uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/dashboard`;

const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BACKEND_URL);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  stats: [],
  recentActivity: [],
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard(state) {
      state.stats = [];
      state.recentActivity = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;
        state.stats = [
          {
            title: "Total Revenue",
            value: `$${data.stats.totalRevenue.toLocaleString()}`,
            icon: "DollarSign",
          },
          {
            title: "Products",
            value: data.stats.productCount,
            icon: "Package",
          },
          {
            title: "Active Orders",
            value: data.stats.activeOrders,
            icon: "ShoppingCart",
          },
          {
            title: "AI Conversations",
            value: data.stats.aiConversations,
            icon: "MessageSquare",
          },
        ];

        state.recentActivity = data.recentActivity.map((act) => ({
          ...act,
          icon: act.icon, 
        }));
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch dashboard data";
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export {getDashboardData};
export default dashboardSlice.reducer;