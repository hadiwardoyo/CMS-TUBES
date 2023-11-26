import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import customerSlice from "./customerSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import dashboardSlice from "./dashboardSlice";
import categorySlice from "./categorySlice";
import adminSlice from "./adminSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		customer: customerSlice,
		order: orderSlice,
		product: productSlice,
		dashboard: dashboardSlice,
		category: categorySlice,
		admin: adminSlice,
	},
});
