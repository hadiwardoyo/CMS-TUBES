import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";
import Swal from "sweetalert2";

const initialState = {
  customers: [],
  paginate: [],
  searchData: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers(state, action) {
      state.customers = action.payload;
    },
    setPaginate(state, action) {
      state.paginate = action.payload;
    },
    setSearchData(state, action) {
      state.searchData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setDelCustomerRes(state, action) {
      state.delCustomerRes = action.payload;
    },
  },
});

export const getSearchData = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/user/search-data`,
      });

      dispatch(setSearchData(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const getCustomers = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/user/customers`,
        params: {
          search_query: data.search_query,
          page: data.page,
          limit: data.limit,
        },
      });
      console.log(response);
      dispatch(setCustomers(response.data.result));
      dispatch(setPaginate(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const deleteCustomer = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/user/delete/${id}`,
        timeout: 10000,
      });
      Swal.fire({
        icon: "success",
        title: "Success to Delete User",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(setDelCustomerRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
};

export const {
  setCustomers,
  setLoading,
  setError,
  setPaginate,
  setSearchData,
  setDelCustomerRes,
} = customerSlice.actions;
export default customerSlice.reducer;
