import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  deleteProduct,
  editProducts,
  getProducts,
  resetDetailProduct,
  setDetailProduct,
} from "../stores/productSlice";
import SearchBar from "../components/SearchBar";
import { useDropzone } from "react-dropzone";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../stores/categorySlice";
import Swal from "sweetalert2";
import { Loading, ResultSearchProduct } from "../components";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultSearch, setResultSearch] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [CategoryId, setCategoryId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fruit, setFruit] = useState({
    name: "",
    price: 0,
    stock: 0,
    image: [],
    CategoryId: null,
  });

  const handleInputChangeFruit = (event) => {
    const { name, value } = event.target;
    if (name === "price" || name === "stock") {
      setFruit((prevData) => ({
        ...prevData,
        [name]: +value,
      }));
    } else {
      setFruit((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const { category, delCategory, addCategoryRes } = useSelector(
    (state) => state.category
  );

  const onDrop = useCallback((acceptedFiles) => {
    // Mengolah file yang diunggah di sini, misalnya mengirimnya ke server
    // atau menambahkannya ke daftar file yang diunggah
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const options = category.map((category) => {
    return category;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    setCategoryId(option.id);
    setIsDropdownOpen(false);
  };

  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    detailProduct,
    paginate,
    delProductRes,
    addProductRes,
    editProductRes,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProducts({
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

  const submitAddCategoryHandler = async (e) => {
    e.preventDefault();
    dispatch(addCategory({ name: nameCategory }));
    setNameCategory("");
    dispatch(getCategories());
  };

  const handleDeleteCategory = (id) => {
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
          dispatch(deleteCategory(id));

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
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
        }
      });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    fruit.image = image[0];
    dispatch(addProducts(fruit));
    setShowModalProduct(false);
  };

  const handleCloseModal = () => {
    dispatch(resetDetailProduct());
    setSelectedOption(null);
    setShowModalProduct(false);
  };

  const handleSubmitEditProduct = () => {
    if (image[0] instanceof File) {
      if (CategoryId === null) {
        dispatch(
          editProducts(detailProduct.id, {
            name,
            stock,
            price,
            image: image[0],
          })
        );
      } else {
        dispatch(
          editProducts(detailProduct.id, {
            name,
            stock,
            price,
            image: image[0],
            CategoryId,
          })
        );
      }
      dispatch(
        getProducts({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    } else {
      if (CategoryId === null) {
        dispatch(
          editProducts(detailProduct.id, {
            name,
            stock,
            price,
          })
        );
      } else {
        dispatch(
          editProducts(detailProduct.id, {
            name,
            stock,
            price,
            CategoryId,
          })
        );
      }
      // Lakukan sesuatu jika image tidak berbentuk File
      dispatch(
        getProducts({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    }
    setShowModalProduct(false);
  };

  // render categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (addCategoryRes) {
      dispatch(getCategories());
    }
  }, [addCategoryRes, dispatch]);

  useEffect(() => {
    if (delCategory) {
      dispatch(getCategories());
    }
  }, [delCategory, dispatch]);

  // render product
  useEffect(() => {
    setFruit((prevFruit) => ({
      ...prevFruit,
      image: image,
      CategoryId: CategoryId,
    }));
  }, [image, CategoryId]);

  useEffect(() => {
    if (detailProduct) {
      setId(detailProduct.id);
      setName(detailProduct.name);
      setStock(detailProduct.stock);
      setPrice(detailProduct.price);
      setCategoryId(detailProduct.CategoryId);
      setImage([detailProduct.image]);
      setShowModalProduct(true);
    }
  }, [detailProduct]);

  useEffect(() => {
    if (addProductRes) {
      dispatch(
        getProducts({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    }
  }, [addProductRes, dispatch]);

  useEffect(() => {
    if (editProductRes) {
      dispatch(
        getProducts({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    }
  }, [editProductRes, dispatch]);

  console.log(delProductRes);
  useEffect(() => {
    if (delProductRes) {
      dispatch(
        getProducts({
          search_query: "",
          page: page,
          limit: 8,
        })
      );
    }
  }, [delProductRes, dispatch]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="bg-white rounded-2xl h-[700px] px-3 py-3">
      <div className="relative font-['Nunito'] space-y-4">
        <div className="object-center p-1 flow-root">
          <div className="flex items-center justify-between">
            <h1 className="text-green-700 text-xl font-bold">
              Selling Products
            </h1>
            <SearchBar setResultSearch={setResultSearch} index={"product"} />
            <div className="flex items-center ml-4">
              <button
                type="button"
                onClick={() => setShowModalCategory(true)}
                className="flex w-fit text-white text-base rounded-[15px] bg-green-700 hover:bg-green-600 focus:outline-none h-fit font-medium px-5 py-2 text-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.7649 4.16231L18.7099 5.74531C18.8977 5.9283 19.0029 6.17982 19.0014 6.44201C18.9999 6.70421 18.8918 6.9545 18.7019 7.13531L17.2239 8.93531L12.1939 15.0723C12.1068 15.1749 11.9896 15.2473 11.8589 15.2793L9.25089 15.8793C8.90484 15.8936 8.60642 15.6384 8.56689 15.2943L8.68889 12.7213C8.69794 12.5899 8.74994 12.4652 8.83689 12.3663L13.6499 6.50131L15.3449 4.43331C15.6742 3.98505 16.2936 3.86684 16.7649 4.16231Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 18.2413C4.58579 18.2413 4.25 18.5771 4.25 18.9913C4.25 19.4056 4.58579 19.7413 5 19.7413V18.2413ZM18.7 19.7413C19.1142 19.7413 19.45 19.4056 19.45 18.9913C19.45 18.5771 19.1142 18.2413 18.7 18.2413V19.7413ZM14.3455 6.22062C14.1904 5.83652 13.7534 5.65082 13.3693 5.80586C12.9852 5.9609 12.7995 6.39796 12.9545 6.78206L14.3455 6.22062ZM17.3893 9.66991C17.7933 9.57863 18.0468 9.17711 17.9556 8.77308C17.8643 8.36904 17.4628 8.1155 17.0587 8.20678L17.3893 9.66991ZM5 19.7413H18.7V18.2413H5V19.7413ZM12.9545 6.78206C13.1872 7.35843 13.665 8.18012 14.3765 8.8128C15.1011 9.45718 16.133 9.95371 17.3893 9.66991L17.0587 8.20678C16.416 8.35198 15.8609 8.12551 15.3733 7.69189C14.8725 7.24656 14.5128 6.63526 14.3455 6.22062L12.9545 6.78206Z"
                    fill="white"
                  />
                </svg>
                Category
              </button>
              <button
                onClick={() => setShowModalProduct(true)}
                className="ml-5 inline-block text-white text-base rounded-[15px] bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-orange-700 font-medium px-5 py-2 text-center h-fit"
              >
                + Add Products
              </button>
            </div>
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
                    Product
                  </th>
                  <th scope="col" className="pr-16 pl-1 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {products ? (
                  <ResultSearchProduct
                    resultSearch={resultSearch ? resultSearch : products}
                    modalEditOpen={setShowModalProduct}
                  />
                ) : (
                  <p>{error ? error : "Data Empty"}</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center " name="pagination ">
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

      {/* Modal add Products */}
      {showModalProduct ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#19253d] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold text-orange-500">
                    {detailProduct ? "Edit Product" : "Add Product"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleCloseModal()}
                  >
                    <span className="bg-transparent text-orange-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pb-2 flex-auto">
                  <div className="my-4 text-lg leading-relaxed">
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <div className="col-span-3">
                        <p className="text-white ml-2 pb-2">Fruit Name</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 10.6L5 7.8L8.5 6.4L12 5L19 7.8L15.5 9.2L12 10.6Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.7215 19.6964C12.106 19.8502 12.5425 19.6632 12.6964 19.2786C12.8502 18.894 12.6631 18.4575 12.2785 18.3037L11.7215 19.6964ZM5 16.2H4.25C4.25 16.5067 4.43671 16.7825 4.72146 16.8964L5 16.2ZM5.75 7.80002C5.75 7.38581 5.41421 7.05002 5 7.05002C4.58579 7.05002 4.25 7.38581 4.25 7.80002H5.75ZM11.7215 18.3037C11.3369 18.4575 11.1498 18.894 11.3036 19.2786C11.4575 19.6632 11.894 19.8502 12.2785 19.6964L11.7215 18.3037ZM19 16.2L19.2785 16.8964C19.5633 16.7825 19.75 16.5067 19.75 16.2H19ZM19.75 7.80002C19.75 7.38581 19.4142 7.05002 19 7.05002C18.5858 7.05002 18.25 7.38581 18.25 7.80002H19.75ZM11.25 19C11.25 19.4142 11.5858 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19H11.25ZM12.75 10.6C12.75 10.1858 12.4142 9.85002 12 9.85002C11.5858 9.85002 11.25 10.1858 11.25 10.6H12.75ZM8.77854 5.70367C8.39396 5.54983 7.95748 5.73689 7.80364 6.12148C7.64981 6.50607 7.83687 6.94255 8.22146 7.09638L8.77854 5.70367ZM15.5 9.20002H16.25C16.25 8.89335 16.0633 8.61756 15.7785 8.50367L15.5 9.20002ZM14.75 11.5C14.75 11.9142 15.0858 12.25 15.5 12.25C15.9142 12.25 16.25 11.9142 16.25 11.5H14.75ZM12.2785 18.3037L5.27854 15.5037L4.72146 16.8964L11.7215 19.6964L12.2785 18.3037ZM5.75 16.2V7.80002H4.25V16.2H5.75ZM12.2785 19.6964L19.2785 16.8964L18.7215 15.5037L11.7215 18.3037L12.2785 19.6964ZM19.75 16.2V7.80002H18.25V16.2H19.75ZM12.75 19V10.6H11.25V19H12.75ZM8.22146 7.09638L15.2215 9.89638L15.7785 8.50367L8.77854 5.70367L8.22146 7.09638ZM14.75 9.20002V11.5H16.25V9.20002H14.75Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          {detailProduct ? (
                            <input
                              type="text"
                              placeholder="Fruits.."
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Fruits.."
                              name="name"
                              onChange={handleInputChangeFruit}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <p className="text-white ml-2 pb-2">Stock</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 10.6L5 7.8L8.5 6.4L12 5L19 7.8L15.5 9.2L12 10.6Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.7215 19.6964C12.106 19.8502 12.5425 19.6632 12.6964 19.2786C12.8502 18.894 12.6631 18.4575 12.2785 18.3037L11.7215 19.6964ZM5 16.2H4.25C4.25 16.5067 4.43671 16.7825 4.72146 16.8964L5 16.2ZM5.75 7.80002C5.75 7.38581 5.41421 7.05002 5 7.05002C4.58579 7.05002 4.25 7.38581 4.25 7.80002H5.75ZM11.7215 18.3037C11.3369 18.4575 11.1498 18.894 11.3036 19.2786C11.4575 19.6632 11.894 19.8502 12.2785 19.6964L11.7215 18.3037ZM19 16.2L19.2785 16.8964C19.5633 16.7825 19.75 16.5067 19.75 16.2H19ZM19.75 7.80002C19.75 7.38581 19.4142 7.05002 19 7.05002C18.5858 7.05002 18.25 7.38581 18.25 7.80002H19.75ZM11.25 19C11.25 19.4142 11.5858 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19H11.25ZM12.75 10.6C12.75 10.1858 12.4142 9.85002 12 9.85002C11.5858 9.85002 11.25 10.1858 11.25 10.6H12.75ZM8.77854 5.70367C8.39396 5.54983 7.95748 5.73689 7.80364 6.12148C7.64981 6.50607 7.83687 6.94255 8.22146 7.09638L8.77854 5.70367ZM15.5 9.20002H16.25C16.25 8.89335 16.0633 8.61756 15.7785 8.50367L15.5 9.20002ZM14.75 11.5C14.75 11.9142 15.0858 12.25 15.5 12.25C15.9142 12.25 16.25 11.9142 16.25 11.5H14.75ZM12.2785 18.3037L5.27854 15.5037L4.72146 16.8964L11.7215 19.6964L12.2785 18.3037ZM5.75 16.2V7.80002H4.25V16.2H5.75ZM12.2785 19.6964L19.2785 16.8964L18.7215 15.5037L11.7215 18.3037L12.2785 19.6964ZM19.75 16.2V7.80002H18.25V16.2H19.75ZM12.75 19V10.6H11.25V19H12.75ZM8.22146 7.09638L15.2215 9.89638L15.7785 8.50367L8.77854 5.70367L8.22146 7.09638ZM14.75 9.20002V11.5H16.25V9.20002H14.75Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          {detailProduct ? (
                            <input
                              type="number"
                              placeholder="Stock.."
                              name="stock"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="number"
                              placeholder="Stock.."
                              name="stock"
                              onChange={handleInputChangeFruit}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <p className="text-white ml-2 pb-2">Price</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.9999 14.821C11.5857 14.821 11.2499 15.1568 11.2499 15.571C11.2499 15.9852 11.5857 16.321 11.9999 16.321V14.821ZM10.4999 11L11.0225 10.462C10.9934 10.4338 10.9622 10.408 10.929 10.3848L10.4999 11ZM9.99991 10L10.7495 10.0259C10.7498 10.0172 10.7499 10.0086 10.7499 10H9.99991ZM11.9999 9.179C12.4141 9.179 12.7499 8.84321 12.7499 8.429C12.7499 8.01479 12.4141 7.679 11.9999 7.679V9.179ZM11.9692 16.3214C12.3831 16.3383 12.7323 16.0165 12.7493 15.6027C12.7662 15.1888 12.4444 14.8396 12.0306 14.8226L11.9692 16.3214ZM10.7432 13.2874C10.7986 12.8769 10.5108 12.4992 10.1003 12.4437C9.68981 12.3883 9.3121 12.6761 9.25666 13.0866L10.7432 13.2874ZM12.7499 15.571C12.7499 15.1568 12.4141 14.821 11.9999 14.821C11.5857 14.821 11.2499 15.1568 11.2499 15.571H12.7499ZM11.2499 17C11.2499 17.4142 11.5857 17.75 11.9999 17.75C12.4141 17.75 12.7499 17.4142 12.7499 17H11.2499ZM11.9577 7.68019C11.5441 7.7035 11.2278 8.05765 11.2511 8.4712C11.2744 8.88476 11.6286 9.20112 12.0421 9.17781L11.9577 7.68019ZM13.517 9.04604L12.9641 9.55281L12.9641 9.55281L13.517 9.04604ZM13.2576 10.5039C13.1984 10.9139 13.4828 11.2942 13.8928 11.3533C14.3028 11.4125 14.6831 11.1281 14.7422 10.7181L13.2576 10.5039ZM11.2499 8.429C11.2499 8.84321 11.5857 9.179 11.9999 9.179C12.4141 9.179 12.7499 8.84321 12.7499 8.429H11.2499ZM12.7499 7C12.7499 6.58579 12.4141 6.25 11.9999 6.25C11.5857 6.25 11.2499 6.58579 11.2499 7H12.7499ZM11.9999 16.321C12.4236 16.321 13.062 16.2249 13.6226 15.9039C14.2203 15.5618 14.7499 14.9413 14.7499 13.981H13.2499C13.2499 14.2927 13.113 14.4672 12.8774 14.6021C12.6049 14.7581 12.2432 14.821 11.9999 14.821V16.321ZM14.7499 13.981C14.7499 13.3929 14.5652 12.9133 14.231 12.5272C13.9217 12.1699 13.5166 11.9325 13.1566 11.7465C12.3775 11.3441 11.6676 11.0886 11.0225 10.462L9.97735 11.538C10.8322 12.3684 11.8723 12.7714 12.4682 13.0792C12.7958 13.2484 12.9844 13.379 13.097 13.509C13.1846 13.6102 13.2499 13.7371 13.2499 13.981H14.7499ZM10.929 10.3848C10.8121 10.3034 10.7446 10.1682 10.7495 10.0259L9.25036 9.97414C9.2279 10.6249 9.53679 11.2427 10.0709 11.6152L10.929 10.3848ZM10.7499 10C10.7499 9.73857 10.8069 9.59598 10.8554 9.51794C10.9038 9.44014 10.9744 9.3774 11.0812 9.32479C11.3268 9.20383 11.6681 9.179 11.9999 9.179V7.679C11.6647 7.679 11.0061 7.68967 10.4183 7.97921C10.1085 8.13185 9.80419 8.36811 9.58182 8.72549C9.35959 9.08265 9.24991 9.51143 9.24991 10H10.7499ZM12.0306 14.8226C11.6496 14.807 11.2927 14.6316 11.0477 14.3394L9.89835 15.3032C10.4146 15.9189 11.1664 16.2885 11.9692 16.3214L12.0306 14.8226ZM11.0477 14.3394C10.8027 14.0472 10.6921 13.6653 10.7432 13.2874L9.25666 13.0866C9.14911 13.8829 9.38207 14.6876 9.89835 15.3032L11.0477 14.3394ZM11.2499 15.571V17H12.7499V15.571H11.2499ZM12.0421 9.17781C12.3901 9.1582 12.7286 9.29585 12.9641 9.55281L14.0699 8.53927C13.5303 7.9506 12.755 7.63525 11.9577 7.68019L12.0421 9.17781ZM12.9641 9.55281C13.1996 9.80978 13.3074 10.1589 13.2576 10.5039L14.7422 10.7181C14.8563 9.92774 14.6095 9.12794 14.0699 8.53927L12.9641 9.55281ZM12.7499 8.429V7H11.2499V8.429H12.7499Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          {detailProduct ? (
                            <input
                              type="number"
                              placeholder="Price.."
                              name="price"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="number"
                              placeholder="Price.."
                              name="price"
                              onChange={handleInputChangeFruit}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <p className="text-white ml-2 pb-2">Category</p>
                        <div className="flex w-full">
                          <div class="relative block w-full">
                            <div>
                              <button
                                type="button"
                                className="flex justify-between w-full rounded-xl border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring"
                                id="options-menu"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                                onClick={toggleDropdown}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  className="-ml-1 mr-1"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.885 6.67244L10.529 3.52744C11.3836 2.82419 12.6164 2.82419 13.471 3.52744L17.115 6.67244C17.4887 6.98222 17.7079 7.44011 17.715 7.92544L18 18.0004C18 19.6573 16.6569 21.0004 15 21.0004H9C7.34315 21.0004 6 19.6573 6 18.0004L6.282 7.92544C6.28982 7.43962 6.51021 6.98165 6.885 6.67244Z"
                                    stroke="#FF9D38"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M10 13.2504C9.58579 13.2504 9.25 13.5862 9.25 14.0004C9.25 14.4147 9.58579 14.7504 10 14.7504V13.2504ZM14 14.7504C14.4142 14.7504 14.75 14.4147 14.75 14.0004C14.75 13.5862 14.4142 13.2504 14 13.2504V14.7504ZM9 16.2504C8.58579 16.2504 8.25 16.5862 8.25 17.0004C8.25 17.4147 8.58579 17.7504 9 17.7504V16.2504ZM15 17.7504C15.4142 17.7504 15.75 17.4147 15.75 17.0004C15.75 16.5862 15.4142 16.2504 15 16.2504V17.7504ZM10.5 8.50045L11.25 8.50078L10.5 8.50045ZM11.708 7.02982L11.562 6.29417L11.708 7.02982ZM13.386 7.92764L12.693 8.21438V8.21438L13.386 7.92764ZM12.8329 9.74862L12.4165 9.12487L12.8329 9.74862ZM10.939 9.56144L10.4085 10.0916L10.939 9.56144ZM10 14.7504H14V13.2504H10V14.7504ZM9 17.7504H15V16.2504H9V17.7504ZM11.25 8.50078C11.2502 8.14299 11.503 7.83513 11.854 7.76547L11.562 6.29417C10.5091 6.50314 9.75049 7.42672 9.75 8.50011L11.25 8.50078ZM11.854 7.76547C12.2049 7.69582 12.5562 7.88377 12.693 8.21438L14.0791 7.64089C13.6687 6.64905 12.6148 6.08521 11.562 6.29417L11.854 7.76547ZM12.693 8.21438C12.8298 8.54499 12.714 8.9262 12.4165 9.12487L13.2494 10.3724C14.1421 9.77635 14.4894 8.63273 14.0791 7.64089L12.693 8.21438ZM12.4165 9.12487C12.1189 9.32355 11.7224 9.28437 11.4695 9.03128L10.4085 10.0916C11.1673 10.8508 12.3567 10.9684 13.2494 10.3724L12.4165 9.12487ZM11.4695 9.03128C11.3289 8.89056 11.2499 8.69973 11.25 8.50078L9.75 8.50011C9.74973 9.09695 9.98661 9.66944 10.4085 10.0916L11.4695 9.03128Z"
                                    fill="#FF9D38"
                                  />
                                </svg>
                                <span className="mr-2">
                                  {detailProduct
                                    ? selectedOption ||
                                      options.map((option) => {
                                        if (
                                          detailProduct.CategoryId === option.id
                                        ) {
                                          return option.name;
                                        }
                                      })
                                    : selectedOption || "Options"}
                                </span>

                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            {isDropdownOpen && (
                              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {options.map((option) => (
                                    <to
                                      key={option.id}
                                      href="#"
                                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                                        option.name === selectedOption
                                          ? "bg-gray-200"
                                          : ""
                                      }`}
                                      onClick={() => handleOptionClick(option)}
                                    >
                                      {option.name}
                                    </to>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 bg-white rounded-xl mt-2">
                        <div className="flex-wrap justify-center h-40 items-center text-slate-500 text-center py-5 px-3">
                          <svg
                            width="52"
                            height="52"
                            viewBox="0 0 32 32"
                            className="w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.3335 21.3334L11.4482 15.2187C11.9482 14.7188 12.6264 14.4379 13.3335 14.4379C14.0406 14.4379 14.7188 14.7188 15.2188 15.2187L21.3335 21.3334M18.6668 18.6667L20.7815 16.552C21.2816 16.0521 21.9597 15.7713 22.6668 15.7713C23.3739 15.7713 24.0521 16.0521 24.5522 16.552L26.6668 18.6667M18.6668 10.6667H18.6802M8.00016 26.6667H24.0002C24.7074 26.6667 25.3857 26.3858 25.8858 25.8857C26.3859 25.3856 26.6668 24.7073 26.6668 24V8.00004C26.6668 7.2928 26.3859 6.61452 25.8858 6.11442C25.3857 5.61433 24.7074 5.33337 24.0002 5.33337H8.00016C7.29292 5.33337 6.61464 5.61433 6.11454 6.11442C5.61445 6.61452 5.3335 7.2928 5.3335 8.00004V24C5.3335 24.7073 5.61445 25.3856 6.11454 25.8857C6.61464 26.3858 7.29292 26.6667 8.00016 26.6667Z"
                              stroke="#FF9D38"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          {/* <h4>File yang diunggah:</h4> */}
                          <div className="inline-flex w-auto">
                            <div {...getRootProps()} className="dropzone">
                              <input {...getInputProps()} />
                              <span className="text-green-700 w-auto hover:underline">
                                Upload a file
                              </span>
                            </div>
                            <p className="ml-2 text-left">
                              or{" "}
                              {detailProduct && detailProduct.image !== null
                                ? detailProduct.image.split("-")[1]
                                : "drag and drop"}
                            </p>
                          </div>
                          <p>PNG, JPG, GIF, up to 1 MB</p>
                          <div>
                            <ul>
                              {image.map((file) => (
                                <li key={file.name}>
                                  {file.name} - {file.size} bytes
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b gap-2">
                  <button
                    className="bg-green-700 text-white active:bg-green-600 hover:bg-green-600 font-medium text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={
                      detailProduct ? handleSubmitEditProduct : handleAddProduct
                    }
                  >
                    {detailProduct ? "Update" : "Create"}
                  </button>
                  <button
                    className="text-slate-800 rounded-full font-medium bg-slate-200 px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-slate-300"
                    type="button"
                    onClick={() => handleCloseModal()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Modal add Category */}
      {showModalCategory ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#19253d] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold text-orange-500 px-5">
                    Add Category
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalCategory(false)}
                  >
                    <span className="bg-transparent text-orange-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pb-2 flex-auto">
                  <div className="my-4 text-lg leading-relaxed">
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <div className="col-span-3">
                        <p className="text-white ml-2 pb-2 px-5">
                          Category Name
                        </p>
                        <div className="relative flex w-full gap-3 px-5 items-center mb-3">
                          <span className="z-10 h-full w-auto leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center pl-3 py-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 10.6L5 7.8L8.5 6.4L12 5L19 7.8L15.5 9.2L12 10.6Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.7215 19.6964C12.106 19.8502 12.5425 19.6632 12.6964 19.2786C12.8502 18.894 12.6631 18.4575 12.2785 18.3037L11.7215 19.6964ZM5 16.2H4.25C4.25 16.5067 4.43671 16.7825 4.72146 16.8964L5 16.2ZM5.75 7.80002C5.75 7.38581 5.41421 7.05002 5 7.05002C4.58579 7.05002 4.25 7.38581 4.25 7.80002H5.75ZM11.7215 18.3037C11.3369 18.4575 11.1498 18.894 11.3036 19.2786C11.4575 19.6632 11.894 19.8502 12.2785 19.6964L11.7215 18.3037ZM19 16.2L19.2785 16.8964C19.5633 16.7825 19.75 16.5067 19.75 16.2H19ZM19.75 7.80002C19.75 7.38581 19.4142 7.05002 19 7.05002C18.5858 7.05002 18.25 7.38581 18.25 7.80002H19.75ZM11.25 19C11.25 19.4142 11.5858 19.75 12 19.75C12.4142 19.75 12.75 19.4142 12.75 19H11.25ZM12.75 10.6C12.75 10.1858 12.4142 9.85002 12 9.85002C11.5858 9.85002 11.25 10.1858 11.25 10.6H12.75ZM8.77854 5.70367C8.39396 5.54983 7.95748 5.73689 7.80364 6.12148C7.64981 6.50607 7.83687 6.94255 8.22146 7.09638L8.77854 5.70367ZM15.5 9.20002H16.25C16.25 8.89335 16.0633 8.61756 15.7785 8.50367L15.5 9.20002ZM14.75 11.5C14.75 11.9142 15.0858 12.25 15.5 12.25C15.9142 12.25 16.25 11.9142 16.25 11.5H14.75ZM12.2785 18.3037L5.27854 15.5037L4.72146 16.8964L11.7215 19.6964L12.2785 18.3037ZM5.75 16.2V7.80002H4.25V16.2H5.75ZM12.2785 19.6964L19.2785 16.8964L18.7215 15.5037L11.7215 18.3037L12.2785 19.6964ZM19.75 16.2V7.80002H18.25V16.2H19.75ZM12.75 19V10.6H11.25V19H12.75ZM8.22146 7.09638L15.2215 9.89638L15.7785 8.50367L8.77854 5.70367L8.22146 7.09638ZM14.75 9.20002V11.5H16.25V9.20002H14.75Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          <input
                            type="text"
                            placeholder="Name.."
                            name="nameCategory"
                            value={nameCategory}
                            onChange={(e) => setNameCategory(e.target.value)}
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          />
                          <button
                            className="bg-green-700 text-white active:bg-green-600 hover:bg-green-600 font-medium text-lg px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => submitAddCategoryHandler(e)}
                          >
                            Create
                          </button>
                        </div>
                      </div>

                      {/* list category */}
                      <div className="col-span-3 pb-5 px-5">
                        <div className="relative test-round">
                          <div className="bg-white rounded-xl overflow-y-auto max-h-72 scrollbar-hide">
                            <div className="block text-sm pl-1">
                              {category.map((category) => {
                                const { id, name } = category;
                                return (
                                  <div className="flex justify-between border-2 items-center m-2 border-green-700 rounded-2xl p-2">
                                    <div className="inline-flex items-center gap-2">
                                      <svg
                                        width="21"
                                        height="22"
                                        viewBox="0 0 21 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M17.6788 12.7452L16.2953 17.3555C15.9524 18.4078 14.9127 19.0702 13.8141 18.9363L9.05094 18.2417C8.56935 18.1812 8.1384 17.9129 7.87167 17.5073L2.21801 9.1633C1.32779 7.76592 1.73891 5.91145 3.13629 5.02123L8.19664 1.79743C9.59401 0.907202 11.4485 1.31833 12.3387 2.7157L17.5142 11.3644C17.7686 11.7783 17.8288 12.283 17.6788 12.7452Z"
                                          stroke="#FF9D38"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M11.5175 8.87104C11.8669 8.64849 11.9696 8.18487 11.7471 7.83553C11.5245 7.48618 11.0609 7.3834 10.7116 7.60596L11.5175 8.87104ZM7.33801 9.75516C6.98866 9.97771 6.88588 10.4413 7.10844 10.7907C7.331 11.14 7.79461 11.2428 8.14396 11.0202L7.33801 9.75516ZM10.749 5.80357C11.0984 5.58101 11.2011 5.1174 10.9786 4.76805C10.756 4.41871 10.2924 4.31593 9.94306 4.53848L10.749 5.80357ZM4.88272 7.76228C4.53337 7.98484 4.43059 8.44845 4.65315 8.7978C4.8757 9.14714 5.33932 9.24992 5.68867 9.02737L4.88272 7.76228ZM13.648 13.1458L13.0153 13.5485L13.648 13.1458ZM13.4194 15.0352L13.9378 15.5772L13.4194 15.0352ZM11.5217 15.1796L11.9521 14.5654L11.9521 14.5654L11.5217 15.1796ZM11.0098 13.3466L11.6962 13.6489L11.0098 13.3466ZM12.7077 12.4868L12.8702 11.7547L12.7077 12.4868ZM10.7116 7.60596L7.33801 9.75516L8.14396 11.0202L11.5175 8.87104L10.7116 7.60596ZM9.94306 4.53848L4.88272 7.76228L5.68867 9.02737L10.749 5.80357L9.94306 4.53848ZM13.0153 13.5485C13.2074 13.8503 13.1595 14.2459 12.901 14.4932L13.9378 15.5772C14.7135 14.8352 14.857 13.6487 14.2807 12.7431L13.0153 13.5485ZM12.901 14.4932C12.6424 14.7405 12.2451 14.7707 11.9521 14.5654L11.0913 15.7938C11.9703 16.4098 13.1621 16.3191 13.9378 15.5772L12.901 14.4932ZM11.9521 14.5654C11.6591 14.36 11.552 13.9763 11.6962 13.6489L10.3234 13.0443C9.89077 14.0266 10.2123 15.1778 11.0913 15.7938L11.9521 14.5654ZM11.6962 13.6489C11.8404 13.3214 12.1958 13.1415 12.5451 13.219L12.8702 11.7547C11.8224 11.522 10.7561 12.0619 10.3234 13.0443L11.6962 13.6489ZM12.5451 13.219C12.7393 13.2621 12.9085 13.3807 13.0153 13.5485L14.2807 12.7431C13.9603 12.2396 13.4529 11.884 12.8702 11.7547L12.5451 13.219Z"
                                          fill="#FF9D38"
                                        />
                                      </svg>
                                      {name}
                                    </div>
                                    <div className="flex items-center h-fit">
                                      <button
                                        onClick={() => handleDeleteCategory(id)}
                                      >
                                        <svg
                                          width="26"
                                          height="27"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16.667 9H8.333C7.87295 9 7.5 9.37295 7.5 9.833V16.5C7.5 17.8807 8.61929 19 10 19H15C15.663 19 16.2989 18.7366 16.7678 18.2678C17.2366 17.7989 17.5 17.163 17.5 16.5V9.833C17.5 9.37295 17.1271 9 16.667 9Z"
                                            stroke="#F32D2D"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.5 7.00008L15.394 6.78908C14.8459 5.69263 13.7253 5 12.4995 5C11.2737 5 10.1531 5.69263 9.605 6.78908L9.5 7.00008H15.5Z"
                                            stroke="#F32D2D"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M11.583 12.333C11.583 11.9188 11.2472 11.583 10.833 11.583C10.4188 11.583 10.083 11.9188 10.083 12.333H11.583ZM10.083 15.666C10.083 16.0802 10.4188 16.416 10.833 16.416C11.2472 16.416 11.583 16.0802 11.583 15.666H10.083ZM14.917 12.333C14.917 11.9188 14.5812 11.583 14.167 11.583C13.7528 11.583 13.417 11.9188 13.417 12.333H14.917ZM13.417 15.666C13.417 16.0802 13.7528 16.416 14.167 16.416C14.5812 16.416 14.917 16.0802 14.917 15.666H13.417ZM15.5 6.25C15.0858 6.25 14.75 6.58579 14.75 7C14.75 7.41421 15.0858 7.75 15.5 7.75V6.25ZM17.5 7.75C17.9142 7.75 18.25 7.41421 18.25 7C18.25 6.58579 17.9142 6.25 17.5 6.25V7.75ZM9.5 7.75C9.91421 7.75 10.25 7.41421 10.25 7C10.25 6.58579 9.91421 6.25 9.5 6.25V7.75ZM7.5 6.25C7.08579 6.25 6.75 6.58579 6.75 7C6.75 7.41421 7.08579 7.75 7.5 7.75V6.25ZM10.083 12.333V15.666H11.583V12.333H10.083ZM13.417 12.333V15.666H14.917V12.333H13.417ZM15.5 7.75H17.5V6.25H15.5V7.75ZM9.5 6.25H7.5V7.75H9.5V6.25Z"
                                            fill="#F32D2D"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <span className="absolute bottom-0.5 right-5 h-3 max-w-xl w-11/12 bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Products;
