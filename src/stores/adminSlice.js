import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";
import Swal from "sweetalert2";

const initialState = {
  admins: [],
  delAdminRes: [],
  addAdminRes: [],
  editAdminRes: [],
  detailAdmin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmins(state, action) {
      state.admins = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setDetailAdmin(state, action) {
      state.detailAdmin = action.payload;
    },
    resetDetailAdmin(state) {
      state.detailAdmin = null;
    },
    setDelAdminRes(state, action) {
      state.delAdminRes = action.payload;
    },
    setAddAdminRes(state, action) {
      state.addAdminRes = action.payload;
    },
    setEditAdminRes(state, action) {
      state.editAdminRes = action.payload;
    },
  },
});

export const getAdmins = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${URL}/api/user/admins`,
      });
      dispatch(setAdmins(response.data.result));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
};

export const deleteAdmin = (id) => {
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
      dispatch(setDelAdminRes(response));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
};

export const addAdmin = (data) => {
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
        url: `${URL}/api/user/addAdmin`,
      });
      Swal.fire({
        icon: "success",
        title: "Add Administrator success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(setAddAdminRes(response));
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

export const editAdmin = (id, data) => {
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
        url: `${URL}/api/user/edit/${id}`,
      });
      Swal.fire({
        icon: "success",
        title: "Administrator successfully updated",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setEditAdminRes(response.data.dataRes));
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

export const {
  setAdmins,
  setLoading,
  setError,
  setDetailAdmin,
  resetDetailAdmin,
  setDelAdminRes,
  setAddAdminRes,
  setEditAdminRes,
} = adminSlice.actions;
export default adminSlice.reducer;
