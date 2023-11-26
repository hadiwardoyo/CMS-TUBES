import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer } from "../stores/customerSlice";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Loading, ResultSearchList, SearchBar } from "../components";

const Customers = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);

  console.log(resultSearch);

  const dispatch = useDispatch();
  const { customers, paginate, delCustomerRes, loading } = useSelector(
    (state) => state.customer
  );

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer(id));
    dispatch(
      getCustomers({
        search_query: "",
        page: 0,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getCustomers({
        search_query: "",
        page: page,
        limit: 8,
      })
    );
  }, [page]);

  useEffect(() => {
    if (paginate) {
      setPage(paginate.page);
      setRows(paginate.totalRows);
      setPages(paginate.totalPage);
    }
  }, [paginate]);

  useEffect(() => {
    if (delCustomerRes) {
      dispatch(
        getCustomers({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    }
  }, [delCustomerRes, dispatch]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="bg-white rounded-2xl h-[700px] px-3 py-3">
      <div className="relative font-['Nunito'] space-y-4">
        <div className="object-center p-2 flow-root">
          <div className="flex items-center justify-between">
            <h1 className="text-green-700 text-xl font-bold">List Costumers</h1>
            <SearchBar setResultSearch={setResultSearch} index={"customer"} />
            <div></div>
          </div>
        </div>
        <div className="mb-10 static h-[534px] flow-root">
          {loading ? (
            <div className="absolute bg-white p-[270px] h-full z-10 left-auto max-md:top-36 flex items-center w-full justify-center">
              <Loading />
            </div>
          ) : (
            ""
          )}
          <div className="relative overflow-x-auto sm:rounded-md m-4">
            <table className="w-full text-sm text-left -mt-4 table-auto">
              <thead className="font-bold text-md border-b-green-700 border-b-2">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone
                  </th>

                  <th scope="col" className="px-12 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <ResultSearchList
                  resultSearch={resultSearch ? resultSearch : customers}
                />
                {/* {customers.map((cust) => {
                  const { name, email, phone, address } = cust;
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50 text-slate-600   ">
                      <th scope="row" className="px-4 py-2  text-orange-500">
                        {name}
                      </th>
                      <td className="px-4 py-4"> {email} </td>
                      <td className="px-4 py-4 capitalize ">{phone}</td>
                      <td className="px-12 py-4 ">{address}</td>
                      <td className="px-6 py-4  ">
                        <t
                          href="#"
                          onClick={() => handleDelete()}
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
                        </t>
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex relative justify-center items-center">
          <nav
            className="block justify-between absolute -bottom-11  -space-x-px margin-center"
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pages}
              onPageChange={changePage}
              containerClassName={"inline-flex -space-x-px text-sm h-8"}
              pageLinkClassName={
                "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }
              previousLinkClassName={
                "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              }
              nextLinkClassName={
                "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              }
              activeLinkClassName={
                "flex items-center justify-center px-3 h-8 text-sky-600 font-bold border border-gray-300 bg-sky-200"
              }
              disabledLinkClassName={
                "flex items-center justify-center px-3 h-8 text-blue-600 border border-0"
              }
            />
            <div className="text-center">
              <span className="text-sm font-normal text-black-900">
                Total Rows :{" "}
                <span className="font-semibold text-gray-500 ">{rows}</span>{" "}
                Page : {rows ? page + 1 : 0} of{" "}
                <span className="font-semibold text-gray-500 ">{pages}</span>
              </span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );

  // return (
  // 	<div>
  // 		<SearchBar />
  // 		{customers.map((cust) => {
  // 			return <p>{cust.email}</p>;
  // 		})}
  // 	</div>
  // );
};

export default Customers;
