import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchData } from "../stores/customerSlice";
import { getSearchProduct } from "../stores/productSlice";
import { getSearchOrder } from "../stores/orderSlice";

function SearchBar({ index, setResultSearch }) {
  const [input, setInput] = useState("");
  const keyCustomer = ["name", "email", "phone"];
  const keyOrder = ["User.name", "Payment.Receipt", "status"];
  const keyProduct = ["name", "Category.name"];

  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.customer);
  const { searchOrder } = useSelector((state) => state.order);
  const { searchProduct } = useSelector((state) => state.product);

  const hendleChange = (value) => {
    setInput(value);
  };

  useEffect(() => {
    dispatch(getSearchData());
    dispatch(getSearchProduct());
    dispatch(getSearchOrder());
  }, [dispatch]);

  useEffect(() => {
    if (index === "product") {
      if (input) {
        setResultSearch(
          searchProduct
            .filter((prod) =>
              keyProduct.some((key) => {
                const keys = key.split(".");
                const value = keys.reduce((obj, k) => obj[k], prod);
                return value.toLowerCase().includes(input.toLowerCase());
              })
            )
            .splice(0, 8)
        );
      } else {
        setResultSearch(false);
      }
    } else if (index === "order") {
      if (input) {
        setResultSearch(
          searchOrder
            .filter((order) =>
              keyOrder.some((key) => {
                const keys = key.split(".");
                const value = keys.reduce((obj, k) => obj[k], order);
                return value.toLowerCase().includes(input.toLowerCase());
              })
            )
            .splice(0, 8)
        );
      } else {
        setResultSearch(false);
      }
    } else if (index === "customer") {
      if (input) {
        setResultSearch(
          searchData
            .filter((cust) =>
              keyCustomer.some((key) =>
                cust[key].toLowerCase().includes(input.toLowerCase())
              )
            )
            .splice(0, 8)
        );
      } else {
        setResultSearch(false);
      }
    }
  }, [input]);

  return (
    <>
      <div className="inline-block w-[500px]">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-orange-400 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 ">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="orange"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2.5 pl-11 text-sm focus:outline-none text-green-700 border border-green-700 rounded-full placeholder-orange-400"
            placeholder="Search"
            value={input}
            onChange={(e) => hendleChange(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
