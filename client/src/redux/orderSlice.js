import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri =import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/orders`;

const getOrders = createAsyncThunk(
  "orders/getOrders",
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

const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {

    try {

      const res = await axios.post(
        `${BACKEND_URL}/create`,
        orderData
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
  orders: [],
  loading: false,
  creating: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to fetch orders";
      })

      .addCase(createOrder.pending, (state) => {
        state.creating = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.creating = false;
        state.orders.push(action.payload);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.creating = false;
        state.error =
          action.payload?.message ||
          "Failed to create order";

      });

  },

});

export { getOrders, createOrder };

export default ordersSlice.reducer;