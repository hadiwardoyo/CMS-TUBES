import React, { useState } from "react";
import Swal from "sweetalert2";
import { deleteProduct, setDetailProduct } from "../stores/productSlice";
import { useDispatch } from "react-redux";

export const ResultSearchProduct = ({ resultSearch }) => {
  const dispatch = useDispatch();

  const handleEditProduct = (data) => {
    dispatch(setDetailProduct(data));
  };

  const handleDeleteProduct = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "mx-2 py-1.5 px-4 transition-colors bg-green-600 border active:bg-green-800 font-medium border-green-700 text-white rounded-lg hover:bg-green-700 disabled:opacity-50",
        cancelButton:
          "mx-2 py-1.5 px-4 transition-colors bg-red-500 border active:bg-red-800 font-medium border-red-700 text-white rounded-lg hover:bg-red-700 disabled:opacity-50",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProduct(id));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <>
      {resultSearch.map((fruit) => {
        const { id, name, image, Category, stock, price } = fruit;
        const convertRupiah = require("../helpers/rupiah-format");
        return (
          <tr
            key={id}
            className="bg-white border-b hover:bg-gray-50 text-slate-500"
          >
            <td className="px-6 py-2 w-5 font-medium whitespace-nowrap">
              <img
                className="h-11 inline-flex shadow-xl rounded-lg object-fit"
                src={image}
                alt="image-fruit"
              />
            </td>
            <td className="pl-1 text-slate-700 text-sm font-semibold capitalize">
              {name}
            </td>
            <td className="px-6 py-4 ">
              <td>{Category ? Category.name : "-"}</td>
            </td>
            <td className="px-6 py-4">{stock} Kg</td>
            <td className="px-6 py-4 text-orange-400 w-40">
              {convertRupiah.convertToRupiah(price)}
            </td>
            <td className="px-6 py-4 text-center w-40">
              <button
                onClick={() => handleEditProduct(fruit)}
                className="font-medium text-blue-600 inline-block"
              >
                <svg
                  width="21"
                  height="20"
                  className="h-6 w-6 mr-5 -mb-2"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.68783 4.16667H5.52116C5.07913 4.16667 4.65521 4.34226 4.34265 4.65482C4.03009 4.96739 3.85449 5.39131 3.85449 5.83334V15C3.85449 15.442 4.03009 15.866 4.34265 16.1785C4.65521 16.4911 5.07913 16.6667 5.52116 16.6667H14.6878C15.1299 16.6667 15.5538 16.4911 15.8663 16.1785C16.1789 15.866 16.3545 15.442 16.3545 15V10.8333M15.1762 2.98834C15.3299 2.82915 15.5138 2.70218 15.7172 2.61483C15.9205 2.52749 16.1392 2.48151 16.3605 2.47959C16.5818 2.47766 16.8013 2.51983 17.0061 2.60363C17.2109 2.68744 17.397 2.81119 17.5535 2.96768C17.71 3.12417 17.8337 3.31025 17.9175 3.51508C18.0013 3.71991 18.0435 3.93937 18.0416 4.16067C18.0397 4.38197 17.9937 4.60067 17.9063 4.80401C17.819 5.00735 17.692 5.19126 17.5328 5.345L10.3778 12.5H8.02116V10.1433L15.1762 2.98834Z"
                    stroke="#2E65F3"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <to className="border-r-2 border-green-700"></to>
              <button
                onClick={() => handleDeleteProduct(id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block"
              >
                <svg
                  className="w-5 h-5 ml-5 -mb-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="red"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
