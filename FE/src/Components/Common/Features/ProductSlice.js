//import {createSlide} from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await Axios.get("http://localhost:3003/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default ProductSlice.reducer;
