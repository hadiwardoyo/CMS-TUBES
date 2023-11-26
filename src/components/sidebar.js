import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../stores/authSlice";
import ContentRoutes from "../routes/ContentRoutes";
import Swal from "sweetalert2";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const { editAdminRes } = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(setLogout());
    Swal.fire({
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [setAvatar]);

  useEffect(() => {
    if (editAdminRes.name === localStorage.getItem("name")) {
      setAvatar(editAdminRes.avatar);
    }
  }, [editAdminRes, setAvatar]);

  // dropdown user
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // sidebar active
  const [activeSidebar, setActiveSidebar] = useState("");
  const location = useLocation();
  const handleSidebarClick = (menu) => {
    setActiveSidebar(menu);
  };

  return (
    <div className="container max-w-full">
      {/* Header */}
      <div className="my-8 mx-14 px-12 py-5 bg-white w-auto rounded-2xl align-middle">
        <div className="flex justify-between align-middle h-10">
          <div className="flex gap-3 h-10 align-middle">
            <img
              className="w-auto h-11 mb-1"
              src={"images/header-logo.png"}
              alt="header-logo"
            />
            <div className="garis_verikal mt-1" />
            <h1 className="pl-1 mt-1 font-bold text-green-700 text-2xl">
              {activeSidebar || "Dashboard"}
            </h1>
          </div>
          <div className="flex gap-1 h-10 align-middle">
            <img
              className="rounded-full object-cover h-10 w-10"
              src={avatar}
              alt="profile-pic"
            />

            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup={isDropdownOpen}
                >
                  {localStorage.getItem("name")}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                  onBlur={closeDropdown}
                >
                  <div className="py-1" role="none">
                    {/* <form method="POST" action="#" role="none"> */}
                    <button
                      type="submit"
                      className="text-gray-700 flex gap-2 w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={handleLogout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        className="mt-1"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                      Sign out
                    </button>
                    {/* </form> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="mx-14 mt-14">
        <div className="grid grid-rows-6 grid-flow-col gap-4">
          <div className="row-span-3 font-normal text-sm pl-20 w-60 text-white">
            <div
              className={`side ${
                location.pathname === "/dashboard" || location.pathname === "/"
                  ? "active"
                  : ""
              }`}
            >
              <Link
                to="/dashboard"
                className="mb-8 flex gap-3"
                onClick={() => handleSidebarClick("Dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  id="Dashboard"
                >
                  <path
                    d="M8.5 3h-3a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 0 0-5zm0 4h-3a1.5 1.5 0 0 1 0-3h3a1.5 1.5 0 0 1 0 3zm0 3h-3A2.5 2.5 0 0 0 3 12.5v6A2.5 2.5 0 0 0 5.5 21h3a2.5 2.5 0 0 0 2.5-2.5v-6A2.5 2.5 0 0 0 8.5 10zm1.5 8.5A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-6A1.5 1.5 0 0 1 5.5 11h3a1.5 1.5 0 0 1 1.5 1.5zm8.5-2.5h-3a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 0 0-5zm0 4h-3a1.5 1.5 0 0 1 0-3h3a1.5 1.5 0 0 1 0 3zm0-17h-3A2.5 2.5 0 0 0 13 5.5v6a2.5 2.5 0 0 0 2.5 2.5h3a2.5 2.5 0 0 0 2.5-2.5v-6A2.5 2.5 0 0 0 18.5 3zm1.5 8.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5z"
                    fill="currentColor"
                    class="color000000 svgShape"
                  ></path>
                </svg>
                Dashboard
              </Link>
            </div>
            <div
              className={`side ${
                location.pathname === "/orders" ? "active" : ""
              }`}
            >
              <Link
                to="/orders"
                className="mb-8 flex gap-3"
                onClick={() => handleSidebarClick("Orders")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29 24"
                  className="h-5 w-5"
                  id="Shopping"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <g
                      fill="currentColor"
                      transform="translate(-506 -515)"
                      className="color000000 svgShape"
                    >
                      <path
                        d="M531.292 533.899H514.11a1.325 1.325 0 0 1-.937-2.264c.25-.25.584-.391.938-.391h17.012c.26 0 .484-.176.547-.426l2.836-11.338a.563.563 0 0 0-.547-.699h-22.242l-.836-3.355a.563.563 0 0 0-.549-.426h-3.77a.564.564 0 0 0-.562.562c0 .312.25.562.562.562h3.332l.84 3.355 2.691 10.775c-.389.113-.756.289-1.049.584a2.44 2.44 0 0 0-.717 1.73c0 .779.385 1.443.951 1.893-.074.057-.166.086-.236.158a2.453 2.453 0 0 0 1.734 4.183h.008c.654 0 1.27-.254 1.734-.721a2.424 2.424 0 0 0 .715-1.732c0-.5-.188-.936-.447-1.326h13.168c-.264.4-.445.84-.445 1.326a2.452 2.452 0 0 0 2.449 2.453h.01c.652 0 1.27-.254 1.73-.721a2.434 2.434 0 0 0 .717-1.732c0-1.346-1.1-2.444-2.455-2.45zm1.945-13.992l-2.555 10.213h-16.129l-2.554-10.213h21.238zm-17.799 16.451c.002.352-.137.68-.387.932-.25.25-.582.391-.936.391h-.01a1.325 1.325 0 0 1-.933-2.264 1.328 1.328 0 0 1 2.266.941zm16.795.932a1.32 1.32 0 0 1-.934.391h-.012a1.325 1.325 0 0 1-.935-2.264 1.327 1.327 0 0 1 2.267.941c.001.352-.134.68-.386.932z"
                        fill="currentColor"
                        class="color000000 svgShape"
                      ></path>
                    </g>
                  </g>
                </svg>
                Orders
              </Link>
            </div>
            <div
              className={`side ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              <Link
                to="/products"
                className="mb-8 flex gap-3"
                onClick={() => handleSidebarClick("Products")}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 18 18"
                  height="1em"
                  width="1em"
                  className="h-5 w-5"
                >
                  <path d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464L7.443.184z" />
                </svg>
                Products
              </Link>
            </div>
            <div
              className={`side ${
                location.pathname === "/customers" ? "active" : ""
              }`}
            >
              <Link
                to="/customers"
                className="mb-8 flex gap-3"
                onClick={() => handleSidebarClick("Customers")}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  className="h-5 w-5"
                >
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Customers
              </Link>
            </div>
            <hr class="h-px mb-8 bg-orange-400 border-0 -ml-3 mr-5" />
            <div
              className={`side ${
                location.pathname === "/add-admin" ? "active" : ""
              }`}
            >
              <Link
                to="/add-admin"
                className="mb-8 flex gap-3"
                onClick={() => handleSidebarClick("Add Admin")}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 17 17"
                  height="1em"
                  width="1em"
                  className="h-5 w-5"
                >
                  <path d="M6 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  <path
                    fillRule="evenodd"
                    d="M13.5 5a.5.5 0 01.5.5V7h1.5a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0V8h-1.5a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z"
                  />
                </svg>
                Add Admin
              </Link>
            </div>
            <div
              className={`side ${
                location.pathname === "/logout" ? "active" : ""
              }`}
            >
              <Link to="#">
                <button onClick={handleLogout} className="mb-8 flex gap-3">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    className="h-5 w-5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
                    <path d="M7 12h14l-3-3m0 6l3-3" />
                  </svg>
                  Logout
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-12 w-full -mt-2 row-span-6 rounded-2xl h-full">
            <ContentRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
