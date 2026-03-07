import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri =import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/aiGenerator`;

const generateMetadata = createAsyncThunk(
  "ai/generateMetadata",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/generate-product-metadata`,
        productData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const saveProduct = createAsyncThunk(
  "ai/saveProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/save-product`,
        productData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const getProducts = createAsyncThunk(
  "ai/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/products`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  metadata: null,
  products: [],
  loading: false,
  saving: false,
  error: null
};

export const aiProductSlice = createSlice({
  name: "aiProduct",
  initialState,
  reducers: {
    clearMetadata(state) {
      state.metadata = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(generateMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.metadata = action.payload.data;
      })
      .addCase(generateMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to generate metadata";
      })

      .addCase(saveProduct.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveProduct.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveProduct.rejected, (state, action) => {
        state.saving = false;
        state.error =
          action.payload?.message || "Failed to save product";
      })

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch products";
      });
  },
});

export const { clearMetadata } = aiProductSlice.actions;
export{generateMetadata,saveProduct,getProducts};
export default aiProductSlice.reducer;