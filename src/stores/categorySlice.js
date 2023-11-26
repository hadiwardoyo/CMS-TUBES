import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";

const initialState = {
  category: [],
  delCategory: [],
  addCategoryRes: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setDelCategory(state, action) {
      state.delCategory = action.payload;
    },
    setAddCategoryRes(state, action) {
      state.addCategoryRes = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const getCategories = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/category/get-category`,
      });
      dispatch(setCategory(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const addCategory = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/category/create`,
        timeout: 12000,
      });

      dispatch(setAddCategoryRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/category/delete/${id}`,
        timeout: 12000,
      });
      dispatch(setDelCategory(response));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
};

export const {
  setCategory,
  setLoading,
  setError,
  setDelCategory,
  setAddCategoryRes,
} = categorySlice.actions;
export default categorySlice.reducer;
