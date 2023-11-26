import React from "react";
import { Dashboard, Customers, Orders, Products, AddAdmin } from "../views";
import { Routes, Route } from "react-router-dom";

const ContentRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="orders" element={<Orders />} />
			<Route path="products" element={<Products />} />
			<Route path="customers" element={<Customers />} />
			<Route path="add-admin" element={<AddAdmin />} />
		</Routes>
	);
};

export default ContentRoutes;
