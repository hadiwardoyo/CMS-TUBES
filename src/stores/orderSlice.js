import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";
import Swal from "sweetalert2";

const initialState = {
  orders: [],
  paginate: [],
  searchOrder: [],
  delOrderRes: [],
  detailOrder: [],
  upStatusOrderRes: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setPaginate(state, action) {
      state.paginate = action.payload;
    },
    setSearchOrder(state, action) {
      state.searchOrder = action.payload;
    },
    setDetailOrder(state, action) {
      state.detailOrder = action.payload;
    },
    setDelOrderRes(state, action) {
      state.delOrderRes = action.payload;
    },
    setUpStatusOrderRes(state, action) {
      state.upStatusOrderRes = action.payload;
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

export const getSearchOrder = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/order/search-order`,
      });

      dispatch(setSearchOrder(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const getOrders = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/order/get-all`,
        params: {
          page: data.page,
          limit: data.limit,
        },
      });
      dispatch(setOrders(response.data.result));
      dispatch(setPaginate(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const updateStatus = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/order/update`,
        params: {
          id: data.id,
          status: data.status,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Order update status successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setUpStatusOrderRes(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/order/delete/${id}`,
      });

      dispatch(setDelOrderRes(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const {
  setOrders,
  setLoading,
  setError,
  setSearchOrder,
  setPaginate,
  setUpStatusOrderRes,
  setDelOrderRes,
  setDetailOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
