import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../helpers/MasterAPI";

const initialState = {
	dashboard: {},
	datas: [],
	loading: false,
	error: null,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setDashboard(state, action) {
			state.dashboard = action.payload;
		},
		setData(state, action) {
			state.datas = action.payload;
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

export const getDashboard = (data) => {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await axios({
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				url: `${URL}/api/order/all-income`,
				// params: {
				// 	search_query: "",
				// 	page: data.page,
				// 	limit: 10,
				// },
			});
			// console.log(response.data.result);
			dispatch(setDashboard(response.data));
			dispatch(setData(response.data.result));
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setError(error.response.data.message));
			dispatch(setLoading(false));
		}
	};
};

export const { setDashboard, setData, setLoading, setError } =
	dashboardSlice.actions;
export default dashboardSlice.reducer;
