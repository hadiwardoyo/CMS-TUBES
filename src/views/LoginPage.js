import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../stores/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    dispatch(loginAdmin(data));
  };

  useEffect(() => {
    console.log("datanya berubah ges", isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(110deg, #D9D9D9 50%, #19253D 50%)",
        }}
      >
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="w-[800px] h-[500px] relative bg-center flex flex-col items-center">
            <div className="w-[800px] h-[500px] left-[3px] top-[13px] absolute bg-slate-800 bg-opacity-30 rounded shadow"></div>
            <div className="left-[450px] top-[179px] absolute  text-base font-bold font-['Nunito'] tracking-tight">
              <label className="text-orange-400" htmlFor="email">
                Username / Email
              </label>
              <input
                className="w-[300px] h-10 bg-zinc-300 text-green-700 rounded-[5px] p-2"
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-[188px] h-[55px] left-[507px] top-[74px] absolute">
              <img
                className="w-[188px] h-[55px] left-0 top-[11px] bg-transparent absolute"
                src={"/images/header-logo.png"}
                alt="header-logo"
              />
            </div>
            <div className="left-[708px] top-[25px] absolute text-white text-sm font-normal font-['Nunito'] tracking-tight">
              Need Help ?
            </div>
            <div className="w-[293px] h-[100px] left-[44px] top-[232px] absolute text-center text-white text-xl font-normal font-['Nunito'] tracking-tight">
              Selamat datang di Daily Fresh CMS, tempat terbaik untuk
              mendapatkan keharuman dan kesegaran buah-buahan setiap hari!
            </div>
            <img
              className="w-[137px] h-[100px] left-[96px] top-[112px] absolute bg-transparent"
              src={"/images/ico-header.png"}
              alt="ico-logo"
            />
            <div className="left-[450px] top-[257px] absolute text-base font-bold font-['Nunito'] tracking-tight">
              <label className="text-orange-400" htmlFor="password">
                Password
              </label>
              <input
                className="w-[300px] h-10 bg-zinc-300 rounded-[5px] p-2 text-green-700"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="left-[450px] top-[328px] w-full absolute">
              <div className="flex pl-2 mt-1 text-white w-fit items-center text-xs font-normal font-['Nunito'] gap-1 tracking-tight">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="w-5 h-3 pt-10 bg-zinc-300 "
                />
                <label htmlFor="remember" className="w-fit">
                  Remember me
                </label>
              </div>
            </div>
            <div className="w-[300px] h-[35px] left-[450px] top-[381px] absolute">
              <button
                className="w-[300px] h-[35px] relative bg-lime-600 hover:bg-lime-500 rounded-full"
                onClick={submitHandler}
              >
                <div className="w-[300px] h-[35px] flex items-center justify-center text-white text-xl font-extrabold font- z-10">
                  LOGIN
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
