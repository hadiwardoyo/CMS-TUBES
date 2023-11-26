import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../stores/orderSlice";
import SearchBar from "../components/SearchBar";
import Swal from "sweetalert2";
import { Loading, ResultSearchOrder } from "../components";
import ReactPaginate from "react-paginate";

const Orders = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const dispatch = useDispatch();
  const { orders, paginate, upStatusOrderRes, delOrderRes, loading, error } =
    useSelector((state) => state.order);
  // console.log(orders);

  useEffect(() => {
    dispatch(
      getOrders({
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
    if (upStatusOrderRes) {
      dispatch(
        getOrders({
          page: page,
          limit: 8,
        })
      );
    }
  }, [upStatusOrderRes]);

  useEffect(() => {
    if (delOrderRes) {
      dispatch(
        getOrders({
          page: page,
          limit: 8,
        })
      );
    }
  }, [delOrderRes]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="bg-white rounded-2xl h-[700px] px-3 py-3">
      <div className="relative font-['Nunito'] space-y-4">
        <div className="object-center p-2 flow-root">
          <div className="flex items-center justify-between">
            <h1 className="text-green-700 text-xl font-bold">
              Customers Orders
            </h1>
            <SearchBar setResultSearch={setResultSearch} index={"order"} />
            <div></div>
          </div>
        </div>

        {/* TABLE OF CONTENT */}
        <div className="mb-10 static h-[534px] flow-root">
          {loading ? (
            <div className="absolute bg-white p-[270px] z-10 left-auto max-md:top-36 flex items-center w-full justify-center">
              <Loading />
            </div>
          ) : (
            ""
          )}
          <div className="relative overflow-x-auto sm:rounded-md m-4 mb-10">
            <table className="w-full text-sm text-left -mt-4 table-auto">
              <thead className="font-bold text-md border-b-green-700 border-b-2">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Receipt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                  <th scope="col" className="px-14 py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="relative">
                {orders ? (
                  <ResultSearchOrder
                    resultSearch={resultSearch ? resultSearch : orders}
                  />
                ) : (
                  <p>{error ? error : "Data Empty"}</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center" name="pagination ">
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
                <span className="font-semibold text-gray-500 ">
                  {rows ? rows : 0}
                </span>{" "}
                Page : {rows ? page + 1 : 0} of{" "}
                <span className="font-semibold text-gray-500 ">
                  {pages ? pages : 0}
                </span>
              </span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Orders;
