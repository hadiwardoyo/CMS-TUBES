import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../helpers/MasterAPI";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
	isLoggedIn: localStorage.getItem("token") ? true : false,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin(state, action) {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("name", action.payload.user.name);
			localStorage.setItem("avatar", action.payload.user.avatar);
			state.isLoggedIn = true;
		},
		setLogout(state) {
			localStorage.clear();
			state.isLoggedIn = false;
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

export const loginAdmin = (data) => {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await axios({
				method: "POST",
				url: `${URL}/api/user/login`,
				data,
			});
			if (response.data.user.role === "admin") {
				dispatch(setLogin(response.data));
				Swal.fire({
					icon: "success",
					title: "Login Success",
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "You are not admin",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			dispatch(setError(error.response.data.message));
			Swal.fire({
				icon: "error",
				title: error.response.data.message,
				showConfirmButton: false,
				timer: 1500,
			});
			dispatch(setLoading(false));
		}
	};
};

export const { setLogin, setLogout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
