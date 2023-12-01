import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getCustomers, deleteCustomer } from "../stores/customerSlice";

export const ResultSearchList = ({ resultSearch }) => {
  const dispatch = useDispatch();

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
          dispatch(deleteCustomer(id));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
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
      {resultSearch.map((search) => {
        const { id, name, email, phone, address } = search;
        return (
          <tr
            key={id}
            className="bg-white border-b hover:bg-gray-50 text-slate-600   "
          >
            <th scope="row" className="px-4 py-2  text-orange-500 capitalize">
              {name}
            </th>
            <td className="px-4 py-4"> {email} </td>
            <td className="px-4 py-4 capitalize ">{phone}</td>
            <td className="px-12 py-4 ">{address}</td>
            <td className="px-6 py-4  ">
              <button
                href="#"
                onClick={() => handleDelete(id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block"
              >
                <svg
                  className="w-6 h-6 ml-5 -mb-1"
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
