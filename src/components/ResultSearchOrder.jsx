import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteOrder, updateStatus } from "../stores/orderSlice";

export const ResultSearchOrder = ({ resultSearch }) => {
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const dispatch = useDispatch();

  const handleStatusChange = (event, id) => {
    const newSelectedStatusMap = { ...selectedStatusMap };
    const status = event.target.value;
    newSelectedStatusMap[id] = { id, status };
    setSelectedStatusMap(newSelectedStatusMap);

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
        text: "You wont to change status!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(updateStatus({ id, status }));
          setSelectedStatusMap({});

          swalWithBootstrapButtons.fire(
            "Changed!",
            "Status has been Changed.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
          setSelectedStatusMap({});
        }
      });
  };

  const handleDelete = async (id) => {
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
          dispatch(deleteOrder(id));

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <>
      {resultSearch.map((order) => {
        const { id, User, Payment, Fruits, status } = order;
        const convertRupiah = require("../helpers/rupiah-format");

        let total = 0;

        return (
          <tr
            key={id}
            className="bg-white border-b hover:bg-gray-50 text-slate-500"
          >
            <th
              scope="row"
              className="px-6 py-4 text-sm font-bold whitespace-nowrap text-orange-500 capitalize"
            >
              {User !== null ? User.name : "user"}
            </th>
            <td className="px-6 py-4 ">{Payment.Receipt}</td>
            <td className="px-6 py-4">
              {Fruits.map((fruit, index) => {
                const { name } = fruit;
                const isLast = index === Fruits.length - 1;
                return isLast ? (
                  <span key={index}>{name}</span>
                ) : (
                  <span key={index}>{name}, </span>
                );
              })}
            </td>
            <td className="px-6 py-4">
              {Fruits.map((fruit, index) => {
                const { BucketJunc, price } = fruit;
                let totalPrice = +BucketJunc.totalItem * price;
                total += totalPrice;
                const isLast = index === Fruits.length - 1;
                return isLast ? (
                  <span key={index}>{BucketJunc.totalItem} kg</span>
                ) : (
                  <span key={index}>{BucketJunc.totalItem} kg, </span>
                );
              })}
            </td>
            <td className="px-6 py-4 text-orange-500">
              {convertRupiah.convertToRupiah(total)}
            </td>
            <td className="px-6 py-4">
              <label for="underline_select" className="sr-only">
                Underline select
              </label>
              <div className="flex items-center">
                {status === "Packaging" ? (
                  <div className="flex justify-between text-left items-center pr-4 h-7 w-fit border-2 rounded-full border-slate-400">
                    <select
                      id="underline_select"
                      className="py-0 pl-4 pr-2 w-auto text-[10px] text-left font-bold text-slate-400 bg-transparent appearance-none focus:outline-none inline-flex"
                      value={selectedStatusMap[id] || "Packaging"}
                      onChange={(e) => handleStatusChange(e, id)}
                    >
                      <option value="Packaging">Packaging</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Delivered">Delivered </option>
                    </select>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      className="h-6 w-6 bg-transparent"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.51253 4.16667H5.34587C4.90384 4.16667 4.47992 4.34226 4.16735 4.65482C3.85479 4.96739 3.6792 5.39131 3.6792 5.83334V15C3.6792 15.442 3.85479 15.866 4.16735 16.1785C4.47992 16.4911 4.90384 16.6667 5.34587 16.6667H14.5125C14.9546 16.6667 15.3785 16.4911 15.691 16.1785C16.0036 15.866 16.1792 15.442 16.1792 15V10.8333M15.0009 2.98834C15.1546 2.82915 15.3385 2.70218 15.5419 2.61483C15.7452 2.52749 15.9639 2.48151 16.1852 2.47959C16.4065 2.47766 16.626 2.51983 16.8308 2.60363C17.0356 2.68744 17.2217 2.81119 17.3782 2.96768C17.5347 3.12417 17.6584 3.31025 17.7422 3.51508C17.826 3.71991 17.8682 3.93937 17.8663 4.16067C17.8644 4.38197 17.8184 4.60067 17.731 4.80401C17.6437 5.00735 17.5167 5.19126 17.3575 5.345L10.2025 12.5H7.84587V10.1433L15.0009 2.98834Z"
                        stroke="#3C3C43"
                        stroke-opacity="0.6"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : status === "Delivery" ? (
                  <div className="flex justify-between text-left items-center pr-4 h-7 w-fit border-2 rounded-full border-blue-600">
                    <select
                      id="underline_select"
                      className=" pl-4 pr-2 w-auto text-[10px] text-left font-bold text-blue-600 bg-transparent appearance-none focus:outline-none inline-flex peer"
                      value={selectedStatusMap[id] || "Delivery"}
                      onChange={(e) => handleStatusChange(e, id)}
                    >
                      <option value="Delivery">Delivery</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Delivered">Delivered </option>
                    </select>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      className="h-6 w-6 bg-transparent"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.51253 4.16667H5.34587C4.90384 4.16667 4.47992 4.34226 4.16735 4.65482C3.85479 4.96739 3.6792 5.39131 3.6792 5.83334V15C3.6792 15.442 3.85479 15.866 4.16735 16.1785C4.47992 16.4911 4.90384 16.6667 5.34587 16.6667H14.5125C14.9546 16.6667 15.3785 16.4911 15.691 16.1785C16.0036 15.866 16.1792 15.442 16.1792 15V10.8333M15.0009 2.98834C15.1546 2.82915 15.3385 2.70218 15.5419 2.61483C15.7452 2.52749 15.9639 2.48151 16.1852 2.47959C16.4065 2.47766 16.626 2.51983 16.8308 2.60363C17.0356 2.68744 17.2217 2.81119 17.3782 2.96768C17.5347 3.12417 17.6584 3.31025 17.7422 3.51508C17.826 3.71991 17.8682 3.93937 17.8663 4.16067C17.8644 4.38197 17.8184 4.60067 17.731 4.80401C17.6437 5.00735 17.5167 5.19126 17.3575 5.345L10.2025 12.5H7.84587V10.1433L15.0009 2.98834Z"
                        stroke="#2E65F3"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : status === "Delivered" ? (
                  <div className="flex justify-between text-left items-center pr-4 h-7 w-fit border-2 rounded-full border-green-700">
                    <select
                      id="underline_select"
                      className="pl-4 pr-2 w-auto text-[10px] text-left font-bold text-green-700 bg-transparent appearance-none focus:outline-none inline-flex peer"
                      value={selectedStatusMap[id] || "Delivered"}
                      onChange={(e) => handleStatusChange(e, id)}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Delivery">Delivery </option>
                    </select>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      className="h-6 w-6 bg-transparent"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.51253 4.16667H5.34587C4.90384 4.16667 4.47992 4.34226 4.16735 4.65482C3.85479 4.96739 3.6792 5.39131 3.6792 5.83334V15C3.6792 15.442 3.85479 15.866 4.16735 16.1785C4.47992 16.4911 4.90384 16.6667 5.34587 16.6667H14.5125C14.9546 16.6667 15.3785 16.4911 15.691 16.1785C16.0036 15.866 16.1792 15.442 16.1792 15V10.8333M15.0009 2.98834C15.1546 2.82915 15.3385 2.70218 15.5419 2.61483C15.7452 2.52749 15.9639 2.48151 16.1852 2.47959C16.4065 2.47766 16.626 2.51983 16.8308 2.60363C17.0356 2.68744 17.2217 2.81119 17.3782 2.96768C17.5347 3.12417 17.6584 3.31025 17.7422 3.51508C17.826 3.71991 17.8682 3.93937 17.8663 4.16067C17.8644 4.38197 17.8184 4.60067 17.731 4.80401C17.6437 5.00735 17.5167 5.19126 17.3575 5.345L10.2025 12.5H7.84587V10.1433L15.0009 2.98834Z"
                        stroke="#2C812A"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  ""
                )}

                <button
                  onClick={() => handleDelete(id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block"
                >
                  <svg
                    className="w-5 h-5 ml-5"
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
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};
