import React, { useEffect, useState } from "react";
import { Chart, defaults, plugins } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../stores/dashboardSlice";
import { getStockProducts } from "../stores/productSlice";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { stockProducts } = useSelector((state) => state.product);
  let { dashboard, datas } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getStockProducts());
  }, [getStockProducts, dispatch]);

  useEffect(() => {
    dispatch(getDashboard());
    console.log(datas);
  }, [getDashboard, dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const data = {
    labels: datas.map((v) => {
      const date = new Date(v.date);
      return date.getDate();
    }),
    datasets: [
      {
        label: "Amount",
        data: datas.map((v) => v.amount),
        fill: false,
        borderColor: "rgba(255, 157, 56, 1)",
        tension: 0.3,
      },
      {
        label: "Sold Fruit",
        data: datas.map((v) => v.total),
        fill: false,
        borderColor: "rgba(44, 129, 42, 0.4)",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  };

  const getIndonesianMonth = (date) => {
    // Array of month names in Bahasa Indonesia
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Validate input date
    if (!(date instanceof Date) || isNaN(date)) {
      console.error("Invalid date input.");
      return null;
    }

    // Get the month index (0-11) from the date
    const monthIndex = date.getMonth();

    // Return the Indonesian month name
    return monthNames[monthIndex];
  };
  const convertRupiah = require("../helpers/rupiah-format");

  return (
    <div className="relative ml-10 w-auto">
      <div class="grid grid-cols-7 grid-flow-row-dense gap-5 h-fit">
        {/* New Income Today */}
        <div class="bg-white rounded-2xl col-span-2 text-center w-full">
          <div className="inline-grid gap-9 py-5 px-7 w-full h-full">
            <div className="flex gap-3 items-center text-green-700 font-semibold">
              <svg
                width="37"
                height="28"
                viewBox="0 0 37 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.3">
                  <ellipse
                    cx="17.1616"
                    cy="11.9906"
                    rx="13.2087"
                    ry="11.9973"
                    fill="#FF9D38"
                  />
                  <ellipse
                    cx="1.97154"
                    cy="1.79294"
                    rx="1.98131"
                    ry="1.79959"
                    fill="#FF9D38"
                  />
                </g>
                <path
                  d="M19.4421 17.9191C19.4421 19.2089 20.5319 20.2486 21.8858 20.2486H24.6486C25.8263 20.2486 26.784 19.3388 26.784 18.2191C26.784 16.9994 26.2006 16.5695 25.331 16.2895L20.8951 14.8898C20.0255 14.6099 19.4421 14.18 19.4421 12.9603C19.4421 11.8405 20.3998 10.9307 21.5775 10.9307H24.3404C25.6943 10.9307 26.784 11.9705 26.784 13.2602"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.1055 9.59116V21.5885"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.1054 25.5876C29.1845 25.5876 34.1127 21.1114 34.1127 15.5898C34.1127 10.0682 29.1845 5.59207 23.1054 5.59207C17.0263 5.59207 12.0981 10.0682 12.0981 15.5898C12.0981 21.1114 17.0263 25.5876 23.1054 25.5876Z"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>New Income</p>
            </div>
            <div className="flex gap-1 justify-between">
              <div className="block pl-2 -mt-2">
                <h1 className="font-extrabold text-2xl mb-1 text-sky-950">
                  {`${convertRupiah.convertToRupiah(dashboard.dailyIncome)}`}
                </h1>
                <div className="flex gap-2 items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1296 3.18652L11.3941 3.18652L8.49668 3.18652L7.7612 3.18652C6.80283 3.18652 6.20571 4.22613 6.6886 5.05395L8.87279 8.79828C9.35196 9.6197 10.5388 9.61971 11.018 8.79828L13.2022 5.05395C13.6851 4.22613 13.0879 3.18652 12.1296 3.18652Z"
                      fill="#FF9D38"
                    />
                    <path
                      opacity="0.4"
                      d="M3.73858 12.5187L4.47407 12.5187L7.37148 12.5187L8.10697 12.5187C9.06534 12.5187 9.66246 11.4791 9.17956 10.6513L6.99537 6.90698C6.51621 6.08556 5.32934 6.08555 4.85018 6.90698L2.66599 10.6513C2.18309 11.4791 2.78021 12.5187 3.73858 12.5187Z"
                      fill="#FF9D38"
                    />
                  </svg>
                  <p className="text-slate-500">form today</p>
                </div>
              </div>
              <svg
                width="81"
                height="41"
                viewBox="0 0 81 41"
                fill="none"
                className="h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.9"
                  d="M0.385498 11.5858C0.385498 10.3514 1.38621 9.35066 2.62065 9.35066H4.52661C5.09226 9.35066 5.63687 9.56512 6.05064 9.9508L6.8833 10.7269C7.74176 11.5271 9.07288 11.5271 9.93134 10.7269L10.764 9.9508C11.1778 9.56512 11.7224 9.35066 12.288 9.35066H14.3165C15.5509 9.35066 16.5516 10.3514 16.5516 11.5858V38.5801C16.5516 39.8145 15.5509 40.8152 14.3165 40.8152H2.62065C1.38621 40.8152 0.385498 39.8145 0.385498 38.5801V11.5858Z"
                  fill="#2C812A"
                />
                <path
                  opacity="0.9"
                  d="M64.1663 16.2327C64.1663 14.903 65.2441 13.8252 66.5737 13.8252H68.4287C68.9708 13.8252 69.497 14.0081 69.9221 14.3444L70.8194 15.054C71.6947 15.7463 72.931 15.7463 73.8063 15.054L74.7036 14.3444C75.1287 14.0081 75.6549 13.8252 76.197 13.8252H78.1763C79.5059 13.8252 80.5838 14.903 80.5838 16.2326V38.5301C80.5838 39.8597 79.5059 40.9376 78.1763 40.9376H66.5737C65.2441 40.9376 64.1663 39.8597 64.1663 38.5301V16.2327Z"
                  fill="#2C812A"
                />
                <path
                  opacity="0.9"
                  d="M24.1312 21.8366C22.6659 21.8366 21.478 22.9145 21.478 24.2441V38.2277C21.478 39.4622 22.4787 40.4629 23.7132 40.4629H35.6604C36.8949 40.4629 37.8956 39.4622 37.8956 38.2277V24.2441C37.8956 22.9145 36.7077 21.8366 35.2424 21.8366H33.982C33.1561 21.8366 32.3774 22.1856 31.8754 22.7806L31.7312 22.9514C30.6693 24.21 28.5799 24.21 27.518 22.9514L27.3739 22.7806C26.8718 22.1856 26.0931 21.8366 25.2673 21.8366H24.1312Z"
                  fill="#FF9D38"
                />
                <path
                  opacity="0.9"
                  d="M45.2853 0.230179C43.9249 0.230179 42.822 1.23089 42.822 2.46533V38.2277C42.822 39.4621 43.8227 40.4629 45.0572 40.4629H57.0044C58.2389 40.4629 59.2396 39.4621 59.2396 38.2277V2.46533C59.2396 1.23089 58.1367 0.230179 56.7763 0.230179H55.3794C54.531 0.230179 53.7423 0.626356 53.2919 1.27877L53.0561 1.62035C52.0909 3.01847 49.8463 3.01847 48.8811 1.62035L48.6453 1.27877C48.1949 0.626356 47.4062 0.230179 46.5578 0.230179H45.2853Z"
                  fill="#2C812A"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Total Order Today */}
        <div class="bg-white rounded-2xl col-span-2">
          <div className="inline-grid gap-9 py-5 px-7 h-full w-full">
            <div className="flex gap-3 items-center text-green-700 font-semibold">
              <svg
                width="37"
                height="28"
                viewBox="0 0 37 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.3">
                  <ellipse
                    cx="17.7829"
                    cy="11.9906"
                    rx="13.2087"
                    ry="11.9973"
                    fill="#FF9D38"
                  />
                  <ellipse
                    cx="2.59288"
                    cy="1.79294"
                    rx="1.98131"
                    ry="1.79959"
                    fill="#FF9D38"
                  />
                </g>
                <path
                  d="M17.0332 7.58003H30.1705C32.589 7.58003 34.5496 9.35907 34.5496 11.5536V16.5206C34.5496 18.7152 32.589 20.4942 30.1705 20.4942H21.4123C18.9937 20.4942 17.0332 18.7152 17.0332 16.5206V7.58003ZM17.0332 7.58003C17.0332 6.48275 16.0529 5.59323 14.8436 5.59323H12.6541"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.507 23.9711C22.507 24.7941 21.7718 25.4612 20.8648 25.4612C19.9579 25.4612 19.2227 24.7941 19.2227 23.9711C19.2227 23.1482 19.9579 22.481 20.8648 22.481C21.7718 22.481 22.507 23.1482 22.507 23.9711Z"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                />
                <path
                  d="M32.36 23.9711C32.36 24.7941 31.6248 25.4612 30.7178 25.4612C29.8109 25.4612 29.0757 24.7941 29.0757 23.9711C29.0757 23.1482 29.8109 22.481 30.7178 22.481C31.6248 22.481 32.36 23.1482 32.36 23.9711Z"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                />
                <path
                  d="M22.5071 15.5272C25.0865 16.8587 26.5004 16.8448 29.0757 15.5272"
                  stroke="#FF9D38"
                  stroke-width="1.4901"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>New Order (Kg)</p>
            </div>
            <div className="flex gap-1 justify-between">
              <div className="block pl-2 -mt-2">
                <h1 className="font-extrabold text-2xl mb-1 text-sky-950">
                  {dashboard.dailyOrder} kg
                </h1>
                <div className="flex gap-2 items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1296 3.18652L11.3941 3.18652L8.49668 3.18652L7.7612 3.18652C6.80283 3.18652 6.20571 4.22613 6.6886 5.05395L8.87279 8.79828C9.35196 9.6197 10.5388 9.61971 11.018 8.79828L13.2022 5.05395C13.6851 4.22613 13.0879 3.18652 12.1296 3.18652Z"
                      fill="#FF9D38"
                    />
                    <path
                      opacity="0.4"
                      d="M3.73858 12.5187L4.47407 12.5187L7.37148 12.5187L8.10697 12.5187C9.06534 12.5187 9.66246 11.4791 9.17956 10.6513L6.99537 6.90698C6.51621 6.08556 5.32934 6.08555 4.85018 6.90698L2.66599 10.6513C2.18309 11.4791 2.78021 12.5187 3.73858 12.5187Z"
                      fill="#FF9D38"
                    />
                  </svg>
                  <p className="text-slate-500">form today</p>
                </div>
              </div>
              <svg
                width="81"
                height="41"
                className="h-auto"
                viewBox="0 0 81 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.9"
                  d="M0.00683594 11.5858C0.00683594 10.3514 1.00755 9.35066 2.24198 9.35066H4.14795C4.7136 9.35066 5.25821 9.56512 5.67198 9.9508L6.50464 10.7269C7.3631 11.5271 8.69422 11.5271 9.55268 10.7269L10.3853 9.9508C10.7991 9.56512 11.3437 9.35066 11.9094 9.35066H13.9378C15.1722 9.35066 16.173 10.3514 16.173 11.5858V38.5801C16.173 39.8145 15.1722 40.8152 13.9378 40.8152H2.24199C1.00755 40.8152 0.00683594 39.8145 0.00683594 38.5801V11.5858Z"
                  fill="#2C812A"
                />
                <path
                  opacity="0.9"
                  d="M63.7876 16.2327C63.7876 14.903 64.8655 13.8252 66.1951 13.8252H68.05C68.5921 13.8252 69.1183 14.0081 69.5435 14.3444L70.4408 15.054C71.316 15.7463 72.5523 15.7463 73.4276 15.054L74.3249 14.3444C74.7501 14.0081 75.2763 13.8252 75.8183 13.8252H77.7977C79.1273 13.8252 80.2052 14.903 80.2052 16.2326V38.5301C80.2052 39.8597 79.1273 40.9376 77.7977 40.9376H66.1951C64.8655 40.9376 63.7876 39.8597 63.7876 38.5301V16.2327Z"
                  fill="#2C812A"
                />
                <path
                  opacity="0.9"
                  d="M23.7525 21.8366C22.2872 21.8366 21.0994 22.9145 21.0994 24.2441V38.2277C21.0994 39.4622 22.1001 40.4629 23.3345 40.4629H35.2818C36.5162 40.4629 37.5169 39.4622 37.5169 38.2277V24.2441C37.5169 22.9145 36.3291 21.8366 34.8638 21.8366H33.6033C32.7775 21.8366 31.9987 22.1856 31.4967 22.7806L31.3526 22.9514C30.2906 24.21 28.2013 24.21 27.1393 22.9514L26.9952 22.7806C26.4932 22.1856 25.7144 21.8366 24.8886 21.8366H23.7525Z"
                  fill="#2C812A"
                />
                <path
                  d="M44.9066 0.230179C43.5462 0.230179 42.4434 1.23089 42.4434 2.46533V38.2277C42.4434 39.4621 43.4441 40.4629 44.6785 40.4629H56.6258C57.8602 40.4629 58.8609 39.4621 58.8609 38.2277V2.46533C58.8609 1.23089 57.7581 0.230179 56.3977 0.230179H55.0008C54.1523 0.230179 53.3636 0.626356 52.9133 1.27877L52.6774 1.62035C51.7123 3.01847 49.4676 3.01847 48.5025 1.62035L48.2666 1.27877C47.8163 0.626356 47.0276 0.230179 46.1791 0.230179H44.9066Z"
                  fill="#FF9D38"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Chart */}
        <div class="bg-white rounded-2xl row-span-2 col-span-3">
          <div className="inline-grid gap-9 py-5 px-7 h-full w-full">
            <div className="block w-auto h-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-extrabold text-3xl text-sky-950">
                    <p className="text-green-700 font-light text-sm mb-2">
                      {`Income in last 30 days`}
                    </p>
                    {`${convertRupiah.convertToRupiah(
                      dashboard.monthlyIncome
                    )}`}
                  </h1>
                </div>
                {/* <div className="flex items-center">
                  <select
                    id="countries"
                    className="inline-block text-left font-medium bg-gray-100 hover:bg-slate-200 text-sm rounded-lg w-auto p-3"
                  >
                    <option value="week" selected>
                      This Week
                    </option>
                    <option value="month">This Month</option>
                    <option value="years">This Years</option>
                  </select>
                </div> */}
              </div>
              <div className="block h-4/5 w-auto p-1">
                <div className="h-full w-auto">
                  <Line data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Total Order Last Week */}
        <div class="bg-white rounded-2xl col-span-2 ">
          <div class="bg-white rounded-2xl col-span-2 text-center h-full w-full">
            <div className="inline-grid gap-9 py-5 px-7 h-full w-full">
              <div className="flex gap-3 items-center text-green-700 font-semibold">
                <svg
                  width="37"
                  height="28"
                  viewBox="0 0 37 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <ellipse
                      cx="17.6247"
                      cy="12.4312"
                      rx="13.2087"
                      ry="11.9973"
                      fill="#FF9D38"
                    />
                    <ellipse
                      cx="2.43492"
                      cy="2.23352"
                      rx="1.98131"
                      ry="1.79959"
                      fill="#FF9D38"
                    />
                  </g>
                  <path
                    d="M28.0884 14.563C27.2333 15.3389 25.847 15.3389 24.9919 14.563C24.1368 13.7871 24.1368 12.5291 24.9919 11.7532C25.847 10.9773 27.2333 10.9773 28.0884 11.7532C28.9435 12.5291 28.9435 13.7871 28.0884 14.563Z"
                    stroke="#FF9D38"
                    stroke-width="1.11757"
                  />
                  <path
                    d="M20.6097 8.70517C21.5259 7.87377 22.7914 7.44231 24.074 7.52402L28.4141 7.80051C30.5811 7.93856 32.2923 9.49124 32.4444 11.4576L32.7491 15.3958C32.8392 16.5596 32.3637 17.7079 31.4474 18.5393L24.2598 25.0613C22.5264 26.6342 19.7349 26.6513 18.0247 25.0995L13.38 20.8849C11.6699 19.3331 11.6887 16.8001 13.4221 15.2272L20.6097 8.70517Z"
                    stroke="#FF9D38"
                    stroke-width="1.11757"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>Total Order (Kg)</p>
              </div>
              <div className="flex gap-1 justify-between">
                <div className="block pl-2 -mt-2">
                  <h1 className="font-extrabold text-2xl mb-1 text-left text-sky-950">
                    {dashboard.weeklyOrder} kg
                  </h1>
                  <div className="flex gap-2 items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1296 3.18652L11.3941 3.18652L8.49668 3.18652L7.7612 3.18652C6.80283 3.18652 6.20571 4.22613 6.6886 5.05395L8.87279 8.79828C9.35196 9.6197 10.5388 9.61971 11.018 8.79828L13.2022 5.05395C13.6851 4.22613 13.0879 3.18652 12.1296 3.18652Z"
                        fill="#FF9D38"
                      />
                      <path
                        opacity="0.4"
                        d="M3.73858 12.5187L4.47407 12.5187L7.37148 12.5187L8.10697 12.5187C9.06534 12.5187 9.66246 11.4791 9.17956 10.6513L6.99537 6.90698C6.51621 6.08556 5.32934 6.08555 4.85018 6.90698L2.66599 10.6513C2.18309 11.4791 2.78021 12.5187 3.73858 12.5187Z"
                        fill="#FF9D38"
                      />
                    </svg>
                    <p className="text-slate-500">form last week</p>
                  </div>
                </div>
                <svg
                  width="82"
                  height="42"
                  viewBox="0 0 82 42"
                  fill="none"
                  className="h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    d="M0.848633 12.0264C0.848633 10.792 1.84934 9.79127 3.08378 9.79127H4.98975C5.55539 9.79127 6.1 10.0057 6.51377 10.3914L7.34643 11.1675C8.2049 11.9677 9.53601 11.9677 10.3945 11.1675L11.2271 10.3914C11.6409 10.0057 12.1855 9.79127 12.7512 9.79127H14.7796C16.014 9.79127 17.0147 10.792 17.0147 12.0264V39.0207C17.0147 40.2551 16.014 41.2558 14.7796 41.2558H3.08378C1.84934 41.2558 0.848633 40.2551 0.848633 39.0207V12.0264Z"
                    fill="#FF9D38"
                  />
                  <path
                    opacity="0.9"
                    d="M64.6292 16.6732C64.6292 15.3436 65.707 14.2657 67.0366 14.2657H68.8916C69.4336 14.2657 69.9598 14.4487 70.385 14.7849L71.2823 15.4946C72.1576 16.1869 73.3939 16.1869 74.2692 15.4946L75.1665 14.7849C75.5916 14.4487 76.1178 14.2657 76.6599 14.2657H78.6392C79.9688 14.2657 81.0467 15.3436 81.0467 16.6732V38.9707C81.0467 40.3003 79.9688 41.3782 78.6392 41.3782H67.0366C65.707 41.3782 64.6292 40.3003 64.6292 38.9707V16.6732Z"
                    fill="#2C812A"
                  />
                  <path
                    opacity="0.9"
                    d="M24.5941 22.2772C23.1288 22.2772 21.9409 23.3551 21.9409 24.6847V38.6683C21.9409 39.9027 22.9416 40.9035 24.1761 40.9035H36.1233C37.3578 40.9035 38.3585 39.9027 38.3585 38.6683V24.6847C38.3585 23.3551 37.1706 22.2772 35.7053 22.2772H34.4449C33.619 22.2772 32.8403 22.6262 32.3382 23.2212L32.1941 23.392C31.1322 24.6506 29.0428 24.6506 27.9809 23.392L27.8368 23.2212C27.3347 22.6262 26.556 22.2772 25.7301 22.2772H24.5941Z"
                    fill="#2C812A"
                  />
                  <path
                    opacity="0.9"
                    d="M45.7482 0.670776C44.3877 0.670776 43.2849 1.67148 43.2849 2.90592V38.6683C43.2849 39.9027 44.2856 40.9035 45.5201 40.9035H57.4673C58.7018 40.9035 59.7025 39.9027 59.7025 38.6683V2.90593C59.7025 1.67149 58.5996 0.670776 57.2392 0.670776H55.8423C54.9939 0.670776 54.2052 1.06695 53.7548 1.71936L53.519 2.06095C52.5538 3.45907 50.3092 3.45907 49.344 2.06095L49.1082 1.71936C48.6578 1.06695 47.8691 0.670776 47.0207 0.670776H45.7482Z"
                    fill="#2C812A"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Total Income Last Week */}
        <div class="bg-white rounded-2xl col-span-2">
          <div class="bg-white rounded-2xl col-span-2 text-center h-full w-full">
            <div className="inline-grid gap-9 py-5 px-7 h-full w-full">
              <div className="flex gap-3 items-center text-green-700 font-semibold">
                <svg
                  width="37"
                  height="28"
                  viewBox="0 0 37 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <ellipse
                      cx="17.1616"
                      cy="11.9906"
                      rx="13.2087"
                      ry="11.9973"
                      fill="#FF9D38"
                    />
                    <ellipse
                      cx="1.97154"
                      cy="1.79294"
                      rx="1.98131"
                      ry="1.79959"
                      fill="#FF9D38"
                    />
                  </g>
                  <path
                    d="M19.4421 17.9191C19.4421 19.2089 20.5319 20.2486 21.8858 20.2486H24.6486C25.8263 20.2486 26.784 19.3388 26.784 18.2191C26.784 16.9994 26.2006 16.5695 25.331 16.2895L20.8951 14.8898C20.0255 14.6099 19.4421 14.18 19.4421 12.9603C19.4421 11.8405 20.3998 10.9307 21.5775 10.9307H24.3404C25.6943 10.9307 26.784 11.9705 26.784 13.2602"
                    stroke="#FF9D38"
                    stroke-width="1.4901"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.1055 9.59116V21.5885"
                    stroke="#FF9D38"
                    stroke-width="1.4901"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.1054 25.5876C29.1845 25.5876 34.1127 21.1114 34.1127 15.5898C34.1127 10.0682 29.1845 5.59207 23.1054 5.59207C17.0263 5.59207 12.0981 10.0682 12.0981 15.5898C12.0981 21.1114 17.0263 25.5876 23.1054 25.5876Z"
                    stroke="#FF9D38"
                    stroke-width="1.4901"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>Impressions</p>
              </div>
              <div className="flex gap-1 justify-between">
                <div className="block pl-2 -mt-2">
                  <h1 className="font-extrabold text-2xl mb-1 text-sky-950">
                    {`${convertRupiah.convertToRupiah(dashboard.weeklyIncome)}`}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1296 3.18652L11.3941 3.18652L8.49668 3.18652L7.7612 3.18652C6.80283 3.18652 6.20571 4.22613 6.6886 5.05395L8.87279 8.79828C9.35196 9.6197 10.5388 9.61971 11.018 8.79828L13.2022 5.05395C13.6851 4.22613 13.0879 3.18652 12.1296 3.18652Z"
                        fill="#FF9D38"
                      />
                      <path
                        opacity="0.4"
                        d="M3.73858 12.5187L4.47407 12.5187L7.37148 12.5187L8.10697 12.5187C9.06534 12.5187 9.66246 11.4791 9.17956 10.6513L6.99537 6.90698C6.51621 6.08556 5.32934 6.08555 4.85018 6.90698L2.66599 10.6513C2.18309 11.4791 2.78021 12.5187 3.73858 12.5187Z"
                        fill="#FF9D38"
                      />
                    </svg>
                    <p className="text-slate-500">form last week</p>
                  </div>
                </div>
                <svg
                  width="81"
                  height="42"
                  viewBox="0 0 81 42"
                  className="h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    d="M0.469971 12.0264C0.469971 10.792 1.47068 9.79127 2.70512 9.79127H4.61109C5.17673 9.79127 5.72134 10.0057 6.13511 10.3914L6.96777 11.1675C7.82623 11.9677 9.15735 11.9677 10.0158 11.1675L10.8485 10.3914C11.2622 10.0057 11.8069 9.79127 12.3725 9.79127H14.4009C15.6354 9.79127 16.6361 10.792 16.6361 12.0264V39.0207C16.6361 40.2551 15.6354 41.2558 14.4009 41.2558H2.70512C1.47068 41.2558 0.469971 40.2551 0.469971 39.0207V12.0264Z"
                    fill="#2C812A"
                  />
                  <path
                    opacity="0.9"
                    d="M64.2505 16.6732C64.2505 15.3436 65.3284 14.2657 66.658 14.2657H68.5129C69.055 14.2657 69.5812 14.4487 70.0063 14.7849L70.9036 15.4946C71.7789 16.1869 73.0152 16.1869 73.8905 15.4946L74.7878 14.7849C75.213 14.4487 75.7392 14.2657 76.2812 14.2657H78.2606C79.5902 14.2657 80.668 15.3436 80.668 16.6732V38.9707C80.668 40.3003 79.5902 41.3782 78.2606 41.3782H66.658C65.3284 41.3782 64.2505 40.3003 64.2505 38.9707V16.6732Z"
                    fill="#FF9D38"
                  />
                  <path
                    opacity="0.9"
                    d="M24.2154 22.2772C22.7501 22.2772 21.5623 23.3551 21.5623 24.6847V38.6683C21.5623 39.9027 22.563 40.9034 23.7974 40.9034H35.7447C36.9791 40.9034 37.9798 39.9027 37.9798 38.6683V24.6847C37.9798 23.3551 36.7919 22.2772 35.3266 22.2772H34.0662C33.2404 22.2772 32.4616 22.6262 31.9596 23.2212L31.8155 23.392C30.7535 24.6506 28.6642 24.6506 27.6022 23.392L27.4581 23.2212C26.9561 22.6262 26.1773 22.2772 25.3515 22.2772H24.2154Z"
                    fill="#2C812A"
                  />
                  <path
                    opacity="0.9"
                    d="M45.3695 0.670776C44.0091 0.670776 42.9062 1.67148 42.9062 2.90592V38.6683C42.9062 39.9027 43.907 40.9035 45.1414 40.9035H57.0887C58.3231 40.9035 59.3238 39.9027 59.3238 38.6683V2.90593C59.3238 1.67149 58.221 0.670776 56.8606 0.670776H55.4636C54.6152 0.670776 53.8265 1.06695 53.3761 1.71936L53.1403 2.06095C52.1751 3.45907 49.9305 3.45907 48.9653 2.06095L48.7295 1.71936C48.2791 1.06695 47.4904 0.670776 46.642 0.670776H45.3695Z"
                    fill="#2C812A"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Stock Selling Product */}
        <div class="col-span-7 row-span-3 bg-white rounded-2xl h-auto">
          <div className="block p-5">
            <div className="flex justify-between h-fit items-center">
              <h2 className="text-green-700 font-bold text-2xl">
                Lack of Fruits
              </h2>
              {/* <div className="flex items-center">
                <div className="relative inline-block">
                  <div>
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-xl bg-slate-100 px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-slate-200"
                      id="menu-button"
                      aria-expanded={isDropdownOpen}
                      aria-haspopup={isDropdownOpen}
                    >
                      <svg
                        width="32"
                        height="26"
                        viewBox="0 0 32 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.9993 4.5V6.84232C26.9993 7.69407 26.3455 8.75876 25.6916 9.29111L20.0681 13.3369C19.2834 13.8693 18.7603 14.934 18.7603 15.7857V20.3639C18.7603 21.0027 18.2372 21.8545 17.5833 22.1739L15.7524 23.1321C14.0523 23.9838 11.6983 23.0256 11.6983 21.3221V15.6792C11.6983 14.934 11.1752 13.9757 10.6521 13.4434L10.0374 12.9217C9.63199 12.5704 9.55352 12.038 9.88047 11.6228L16.5763 2.87103C16.8117 2.56226 17.2302 2.37062 17.6879 2.37062H24.3838C25.8223 2.37062 26.9993 3.32884 26.9993 4.5Z"
                          fill="#FF9D38"
                        />
                        <path
                          d="M13.5947 3.9996L8.95208 10.0577C8.50743 10.6433 7.48736 10.7284 6.89886 10.228L5.68262 9.18464C5.02873 8.65229 4.50562 7.69407 4.50562 7.05526V4.60647C4.50562 3.32884 5.68262 2.37062 7.12118 2.37062H12.4831C13.5032 2.37062 14.1309 3.28625 13.5947 3.9996Z"
                          fill="#FF9D38"
                        />
                      </svg>
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                      onBlur={closeDropdown}
                    >
                      <div className="py-1" role="none">
                        <form method="POST" action="#" role="none">
                          <button
                            type="submit"
                            className="text-gray-700 flex gap-2 w-full px-4 py-2 text-left text-sm items-center justify-between hover:bg-slate-100"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-3"
                          >
                            In Stock
                            <svg
                              width="14"
                              height="12"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <ellipse
                                cx="7.21689"
                                cy="5.67385"
                                rx="6.53892"
                                ry="5.32345"
                                fill="#03FB75"
                              />
                            </svg>
                          </button>
                          <button
                            type="submit"
                            className="text-gray-700 flex gap-2 w-full px-4 py-2 text-left text-sm items-center justify-between hover:bg-slate-100"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-3"
                          >
                            Out of Stock
                            <svg
                              width="14"
                              height="12"
                              viewBox="0 0 14 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <ellipse
                                cx="7.21689"
                                cy="6.07278"
                                rx="6.53892"
                                ry="5.32345"
                                fill="#FF0000"
                              />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            <table className="w-full whitespace-nowrap">
              <thead className="h-9">
                <tr className="text-slate-600 text-sm">
                  <td>Product Name</td>
                  <td>Category</td>
                  <td>Stock</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tr className="garis_horizontal" />
              <tbody>
                {stockProducts.map((fruit, index) => {
                  const { name, stock, Category, image } = fruit;
                  if (index < 4) {
                    return (
                      <tr className="text-slate-600 text-sm items-center">
                        <td>
                          <div className="flex text-slate-700 font-semibold items-center w-auto gap-4 h-12">
                            <img
                              className="pt-2 h-12 w-16 object-cover rounded-lg"
                              src={image}
                            />
                            <td>{name}</td>
                          </div>
                        </td>
                        <td>{Category ? Category.name : "-"}</td>
                        <td>{stock} kg</td>
                        <td>
                          {stock > 10 ? (
                            <div className="flex items-center">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <ellipse
                                  cx="7.21689"
                                  cy="5.67385"
                                  rx="6.53892"
                                  ry="5.32345"
                                  fill="#03FB75"
                                />
                              </svg>
                              <p className="px-2">
                                <strong>In Stock</strong>
                              </p>
                            </div>
                          ) : stock > 0 ? (
                            <div className="flex items-center">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <ellipse
                                  cx="7.21689"
                                  cy="6.07278"
                                  rx="6.53892"
                                  ry="5.32345"
                                  fill="yellow"
                                />
                              </svg>
                              <p className="px-2">
                                <strong>low stock</strong>
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <ellipse
                                  cx="7.21689"
                                  cy="6.07278"
                                  rx="6.53892"
                                  ry="5.32345"
                                  fill="#FF0000"
                                />
                              </svg>
                              <p className="px-2">
                                <strong>Out of Stock</strong>
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
