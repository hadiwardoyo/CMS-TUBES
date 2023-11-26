import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmins,
  deleteAdmin,
  addAdmin,
  editAdmin,
  resetDetailAdmin,
  setDetailAdmin,
} from "../stores/adminSlice";
import { Loading } from "../components";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const AddAdmin = () => {
  // const [nameCategory, setNameCategory] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [Admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    avatar: [],
  });

  const handleInputChangeAdmin = (event) => {
    const { name, value } = event.target;
    setAdmin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Mengolah file yang diunggah di sini, misalnya mengirimnya ke server
    // atau menambahkannya ke daftar file yang diunggah
    setAvatar(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dispatch = useDispatch();
  const {
    admins,
    loading,
    detailAdmin,
    delAdminRes,
    addAdminRes,
    editAdminRes,
  } = useSelector((state) => state.admin);
  const [showModalAdmin, setShowModalAdmin] = useState(false);

  const handleDeleteAdmin = async (id) => {
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
          dispatch(deleteAdmin(id));

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

  const handleAddAdmin = async (e) => {
    setShowModalAdmin(false);
    e.preventDefault();
    Admin.avatar = avatar[0];
    await dispatch(addAdmin(Admin)).then((result) => {});
  };
  const handleCloseModal = () => {
    dispatch(resetDetailAdmin());
    setSelectedOption(null);
    setShowModalAdmin(false);
  };

  const handleEditAdmin = (data) => {
    dispatch(setDetailAdmin(data));
    setShowModalAdmin(true);
  };

  const handleSubmitEditAdmin = () => {
    if (avatar[0] instanceof File) {
      dispatch(
        editAdmin(detailAdmin.id, {
          name,
          password,
          phone,
          avatar: avatar[0],
          address,
        })
      );

      dispatch(getAdmins());
    } else {
      dispatch(
        editAdmin(detailAdmin.id, {
          name,
          password,
          phone,
          address,
        })
      );

      // Lakukan sesuatu jika avatar tidak berbentuk File
      dispatch(getAdmins());
    }
    setShowModalAdmin(false);
  };
  useEffect(() => {
    dispatch(getAdmins());
  }, [getAdmins, dispatch]);

  // useEffect(() => {
  //   if (admins) {
  //     dispatch(getAdmins());
  //   }
  // }, [admins, dispatch]);

  useEffect(() => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      avatar: avatar,
    }));
  }, [avatar]);

  useEffect(() => {
    if (detailAdmin) {
      setId(detailAdmin.id);
      setName(detailAdmin.name);
      setPassword(detailAdmin.password);
      setPhone(detailAdmin.phone);
      setAddress(detailAdmin.address);
      setAvatar([detailAdmin.avatar]);
    }
  }, [detailAdmin, dispatch]);

  useEffect(() => {
    if (addAdminRes) {
      dispatch(getAdmins());
    }
  }, [addAdminRes, dispatch]);

  useEffect(() => {
    if (editAdminRes) {
      dispatch(getAdmins());
    }
  }, [editAdminRes]);

  useEffect(() => {
    if (delAdminRes) {
      dispatch(getAdmins());
    }
  }, [delAdminRes, dispatch]);

  return (
    <div className="bg-white rounded-2xl h-[700px] px-3 pt-3 pb-8">
      <div className=" relative h-5/6 font-['Nunito'] space-y-4">
        <div className="object-center p-1 flow-root">
          <div className="flex items-center justify-between">
            <h1 className="text-green-700 text-xl font-bold">
              List Administrators
            </h1>
            <div className="flex items-center">
              <button
                onClick={() => setShowModalAdmin(true)}
                className="ml-5 inline-block text-white text-base rounded-[15px] bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-orange-700 font-medium px-5 py-2 text-center h-fit"
              >
                + Add Administrator
              </button>
            </div>
          </div>
        </div>

        {/* TABLE OF CONTENT */}
        <div class="mb-10 static h-full flow-root">
          {loading ? (
            <div className="absolute bg-white p-[270px] h-full z-10 left-auto max-md:top-36 flex items-center w-full justify-center">
              <Loading />
            </div>
          ) : (
            ""
          )}
          <div class="relative overflow-x-auto sm:rounded-md m-4 mb-10">
            <table class="w-full text-sm text-left table-auto">
              <thead class="font-bold text-md border-b-green-700 border-b-2">
                <tr>
                  <th scope="col" class="px-2 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Phone
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Create At
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-4 text-center w-40">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => {
                  const { id, name, email, phone, address, createdAt } = admin;
                  let year = new Date(createdAt).getFullYear();
                  let month = new Date(createdAt).getMonth();
                  let day = new Date(createdAt).getDate();
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50 text-slate-600   ">
                      <th scope="row" class=" py-2  text-orange-500 capitalize">
                        {name}
                      </th>
                      <td class="px-2 py-4"> {email} </td>
                      <td class="px-2 py-4 "> {phone} </td>
                      <td class="px-2 py-4">
                        {year}-{month}-{day}
                      </td>
                      <td class="px-2 py-4 ">{address}</td>
                      <td className="px-6 py-4 text-center w-40 ">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          class="font-medium text-blue-600 inline-block"
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
                        <to class="border-r-2 border-green-700"></to>
                        <button
                          href="#"
                          onClick={() => handleDeleteAdmin(id)}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block"
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
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-center items-center " name="pagination ">
          <p className="font-light text-green-700">Limit 8</p>
        </div>
      </div>
      {/* Modal add Products */}
      {showModalAdmin ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#19253d] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold text-orange-500">
                    {detailAdmin ? "Edit Administrator" : "Add Administrator"}
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
                        <p className="text-white ml-2 pb-2">Username</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5 7C14.5 8.10457 13.6046 9 12.5 9C11.3954 9 10.5 8.10457 10.5 7C10.5 5.89543 11.3954 5 12.5 5C13.6046 5 14.5 5.89543 14.5 7Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.5 15.5C17.5 17.433 15.261 19 12.5 19C9.739 19 7.5 17.433 7.5 15.5C7.5 13.567 9.739 12 12.5 12C15.261 12 17.5 13.567 17.5 15.5Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          {detailAdmin ? (
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter Username / Full Name ..."
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter Username / Full Name ..."
                              onChange={handleInputChangeAdmin}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-white ml-2 pb-2">
                          {detailAdmin ? "Password New" : "Email"}
                        </p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.7505 9.02905C19.7652 9.443 20.1127 9.76663 20.5267 9.75189C20.9406 9.73715 21.2643 9.38962 21.2495 8.97567L19.7505 9.02905ZM16.214 5.00236V5.75236C16.2224 5.75236 16.2307 5.75222 16.2391 5.75194L16.214 5.00236ZM9.786 5.00236L9.76095 5.75194C9.7693 5.75222 9.77765 5.75236 9.786 5.75236V5.00236ZM4.75048 8.97567C4.73573 9.38962 5.05936 9.73715 5.47331 9.75189C5.88726 9.76663 6.23478 9.443 6.24952 9.02905L4.75048 8.97567ZM21.25 9.00236C21.25 8.58815 20.9142 8.25236 20.5 8.25236C20.0858 8.25236 19.75 8.58815 19.75 9.00236H21.25ZM20.5 15.0024L21.2495 15.029C21.2498 15.0202 21.25 15.0113 21.25 15.0024H20.5ZM16.214 19.0024L16.2391 18.2528C16.2307 18.2525 16.2224 18.2524 16.214 18.2524V19.0024ZM9.786 19.0024V18.2524C9.77765 18.2524 9.7693 18.2525 9.76095 18.2528L9.786 19.0024ZM5.5 15.0024H4.75C4.75 15.0113 4.75016 15.0202 4.75048 15.029L5.5 15.0024ZM6.25 9.00236C6.25 8.58815 5.91421 8.25236 5.5 8.25236C5.08579 8.25236 4.75 8.58815 4.75 9.00236H6.25ZM20.8783 9.64996C21.236 9.44103 21.3565 8.98172 21.1476 8.62406C20.9387 8.2664 20.4794 8.14583 20.1217 8.35476L20.8783 9.64996ZM15.236 12.0774L14.8577 11.4297L14.8515 11.4334L15.236 12.0774ZM10.764 12.0774L11.1486 11.4334L11.1423 11.4298L10.764 12.0774ZM5.8783 8.35476C5.52064 8.14583 5.06133 8.2664 4.8524 8.62406C4.64347 8.98172 4.76404 9.44103 5.1217 9.64996L5.8783 8.35476ZM21.2495 8.97567C21.1534 6.27536 18.8895 4.16252 16.1889 4.25278L16.2391 5.75194C18.1129 5.68931 19.6838 7.15537 19.7505 9.02905L21.2495 8.97567ZM16.214 4.25236H9.786V5.75236H16.214V4.25236ZM9.81105 4.25278C7.11054 4.16252 4.84663 6.27536 4.75048 8.97567L6.24952 9.02905C6.31625 7.15537 7.88712 5.68931 9.76095 5.75194L9.81105 4.25278ZM19.75 9.00236V15.0024H21.25V9.00236H19.75ZM19.7505 14.9757C19.6838 16.8494 18.1129 18.3154 16.2391 18.2528L16.1889 19.7519C18.8895 19.8422 21.1534 17.7294 21.2495 15.029L19.7505 14.9757ZM16.214 18.2524H9.786V19.7524H16.214V18.2524ZM9.76095 18.2528C7.88712 18.3154 6.31624 16.8494 6.24952 14.9757L4.75048 15.029C4.84663 17.7294 7.11054 19.8422 9.81105 19.7519L9.76095 18.2528ZM6.25 15.0024V9.00236H4.75V15.0024H6.25ZM20.1217 8.35476L14.8577 11.4298L15.6143 12.725L20.8783 9.64996L20.1217 8.35476ZM14.8515 11.4334C13.7111 12.1145 12.2889 12.1145 11.1485 11.4334L10.3795 12.7213C11.9935 13.6852 14.0065 13.6852 15.6205 12.7213L14.8515 11.4334ZM11.1423 11.4298L5.8783 8.35476L5.1217 9.64996L10.3857 12.725L11.1423 11.4298Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          {detailAdmin ? (
                            <input
                              type="text"
                              name="password"
                              placeholder="New Password"
                              // disabled="true"
                              onChange={(e) => setPassword(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="text"
                              name="email"
                              placeholder="Email.."
                              onChange={handleInputChangeAdmin}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="">
                        <p className="text-white ml-2 pb-2">Phone</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.36343 6.36195C7.24343 5.43495 7.55443 5.17495 7.92943 5.05395C8.18895 4.98595 8.46112 4.98217 8.72243 5.04295C9.06643 5.14295 9.15743 5.21895 10.2854 6.34295C11.2764 7.32995 11.3754 7.43695 11.4704 7.62995C11.6521 7.96873 11.6805 8.36894 11.5484 8.72995C11.4484 9.00495 11.3064 9.18695 10.7054 9.78995L10.3134 10.183C10.2105 10.2876 10.1863 10.4464 10.2534 10.577C11.1244 12.0628 12.36 13.3019 13.8434 14.177C14.0142 14.2684 14.2245 14.2389 14.3634 14.104L14.7404 13.733C14.9734 13.4941 15.2202 13.2691 15.4794 13.059C15.8866 12.809 16.3939 12.7867 16.8214 13C17.0304 13.1 17.0994 13.162 18.1214 14.182C19.1754 15.233 19.2054 15.266 19.3214 15.507C19.5397 15.9059 19.5374 16.3891 19.3154 16.786C19.2024 17.01 19.1334 17.091 18.5404 17.697C18.1824 18.063 17.8454 18.397 17.7914 18.446C17.3022 18.851 16.6746 19.0497 16.0414 19C14.883 18.8944 13.7617 18.5363 12.7564 17.951C10.5296 16.7711 8.63383 15.0521 7.24243 12.951C6.93937 12.5112 6.66994 12.0492 6.43643 11.569C5.81001 10.4953 5.48653 9.27189 5.50043 8.02895C5.54825 7.37871 5.86008 6.77637 6.36343 6.36195Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          {detailAdmin ? (
                            <input
                              type="text"
                              name="phone"
                              placeholder="Phone Number ..."
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="text"
                              name="phone"
                              placeholder="Phone..."
                              onChange={handleInputChangeAdmin}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="text-white ml-2 pb-2">Address</p>
                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                          <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-3">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.5 7V17C7.5 18.1046 8.39543 19 9.5 19H17.5C18.6046 19 19.5 18.1046 19.5 17V7C19.5 5.89543 18.6046 5 17.5 5H9.5C8.39543 5 7.5 5.89543 7.5 7Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.5 10C15.5 11.1046 14.6046 12 13.5 12C12.3954 12 11.5 11.1046 11.5 10C11.5 8.89543 12.3954 8 13.5 8C14.6046 8 15.5 8.89543 15.5 10Z"
                                stroke="#FF9D38"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.05108 16.3992C6.71926 16.6471 6.65126 17.1171 6.89919 17.4489C7.14713 17.7807 7.61711 17.8487 7.94892 17.6008L7.05108 16.3992ZM19.0511 17.6008C19.3829 17.8487 19.8529 17.7807 20.1008 17.4489C20.3487 17.1171 20.2807 16.6471 19.9489 16.3992L19.0511 17.6008ZM5.5 8.25C5.08579 8.25 4.75 8.58579 4.75 9C4.75 9.41421 5.08579 9.75 5.5 9.75V8.25ZM7.5 9.75C7.91421 9.75 8.25 9.41421 8.25 9C8.25 8.58579 7.91421 8.25 7.5 8.25V9.75ZM5.5 11.25C5.08579 11.25 4.75 11.5858 4.75 12C4.75 12.4142 5.08579 12.75 5.5 12.75V11.25ZM7.5 12.75C7.91421 12.75 8.25 12.4142 8.25 12C8.25 11.5858 7.91421 11.25 7.5 11.25V12.75ZM5.5 14.25C5.08579 14.25 4.75 14.5858 4.75 15C4.75 15.4142 5.08579 15.75 5.5 15.75V14.25ZM7.5 15.75C7.91421 15.75 8.25 15.4142 8.25 15C8.25 14.5858 7.91421 14.25 7.5 14.25V15.75ZM7.94892 17.6008C11.2409 15.141 15.7591 15.141 19.0511 17.6008L19.9489 16.3992C16.1245 13.5416 10.8755 13.5416 7.05108 16.3992L7.94892 17.6008ZM5.5 9.75H7.5V8.25H5.5V9.75ZM5.5 12.75H7.5V11.25H5.5V12.75ZM5.5 15.75H7.5V14.25H5.5V15.75Z"
                                fill="#FF9D38"
                              />
                            </svg>
                          </span>
                          {detailAdmin ? (
                            <input
                              type="text"
                              name="address"
                              placeholder="Address.."
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          ) : (
                            <input
                              type="text"
                              name="address"
                              placeholder="Address.."
                              onChange={handleInputChangeAdmin}
                              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
                            />
                          )}
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
                              {detailAdmin
                                ? detailAdmin.avatar.split("-")[1]
                                : "drag and drop"}
                            </p>
                          </div>
                          <p>PNG, JPG, GIF, up to 5MB</p>
                          <div>
                            <ul>
                              {avatar.map((file) => (
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
                      detailAdmin ? handleSubmitEditAdmin : handleAddAdmin
                    }
                  >
                    {detailAdmin ? "Update" : "Create"}
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
    </div>
  );
};

export default AddAdmin;
