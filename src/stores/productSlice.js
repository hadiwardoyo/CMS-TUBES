import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";
import Swal from "sweetalert2";

const initialState = {
  products: [],
  paginate: [],
  searchProduct: [],
  stockProducts: [],
  delProductRes: [],
  addProductRes: [],
  editProductRes: [],
  detailProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setStockProducts(state, action) {
      state.stockProducts = action.payload;
    },
    setPaginate(state, action) {
      state.paginate = action.payload;
    },
    setSearchProduct(state, action) {
      state.searchProduct = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setDetailProduct(state, action) {
      state.detailProduct = action.payload;
    },
    resetDetailProduct(state) {
      state.detailProduct = null;
    },
    setDelProductRes(state, action) {
      state.delProductRes = action.payload;
    },
    setAddProductRes(state, action) {
      state.addProductRes = action.payload;
    },
    setEditProductRes(state, action) {
      state.editProductRes = action.payload;
    },
  },
});

export const getSearchProduct = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/search-product`,
      });

      dispatch(setSearchProduct(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const getProducts = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/get-all`,
        params: {
          search_query: data.search_query,
          page: data.page,
          limit: data.limit,
        },
      });

      dispatch(setProducts(response.data.result));
      dispatch(setPaginate(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const getStockProducts = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/get-stock`,
        // params: {
        // 	search_query: "",
        // 	page: data.page,
        // 	limit: 10,
        // },
      });

      dispatch(setStockProducts(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const addProducts = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/create`,
        // params: {
        // 	search_query: "",
        // 	page: data.page,
        // 	limit: 10,
        // },
      });
      Swal.fire({
        icon: "success",
        title: "Add Product successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setAddProductRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error: " + error.response.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const editProducts = (id, data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "PUT",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/edit/${id}`,
        // params: {
        // 	search_query: "",
        // 	page: data.page,
        // 	limit: 10,
        // },
      });
      Swal.fire({
        icon: "success",
        title: "Update Product successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setEditProductRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error: " + error.response.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/fruit/delete/${id}`,
        // params: {
        // 	search_query: "",
        // 	page: data.page,
        // 	limit: 10,
        // },
      });

      dispatch(setDelProductRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
};

export const {
  setProducts,
  setStockProducts,
  resetDetailProduct,
  setDetailProduct,
  setLoading,
  setError,
  setPaginate,
  setSearchProduct,
  setDelProductRes,
  setAddProductRes,
  setEditProductRes,
} = productSlice.actions;
export default productSlice.reducer;
