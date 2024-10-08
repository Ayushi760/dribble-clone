import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";
import wixIcon from "../assets/wixicon.svg"
import googleIcon from "../assets/google.svg"
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { dispatch, state } = useContext(GlobalStateContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/");
    }
  }, [state.isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      const user = users.find(
        (user) => user.username === identifier || user.email === identifier
      );

      if (user && bcrypt.compareSync(password, user.password)) {
        // Dispatch action to log in the user
        const { password, ...userWithoutPassword } = user;
        dispatch({ type: "LOGIN", payload: userWithoutPassword });

        setIdentifier("");
        setPassword("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log("Invalid username/email or password");
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="max-w-[388px] h-full relative max-laptop_sm:hidden">
        <div className="h-[45%] bg-[#0c0c21] px-8 pt-[68px]">
          <img src={wixIcon} className="h-8" />
          <p className="text-white text-[28px] leading-[38px] font-normal mt-10 mb-2 tracking-[1px] font-sans">Deliver more value to clients with an expert-led SEO course.</p>
          <a href="http://wix.com/seo/learn/course?utm_campaign=pa_media_buying_studio_all_brnd_all_en_10/24_des_clicks_dribbble_sign-in%5Efix&amp;experiment_id=%5Eseo%5E%5Eseo-course" className="mt-4 inline-flex items-center text-base text-white gap-[6px]">
            <span className="underline">Take the course</span>
            <img src="https://cdn.dribbble.com/assets/ads/wix-link-arrow-8f0466c1e5b205f07bf5dca616aa21fe6e3d6f9931a50729cdf25612eda73377.png" className="w-[15px]" />
          </a>
        </div>
        <div className="h-[55%]">
          <a href="http://wix.com/seo/learn/course?utm_campaign=pa_media_buying_studio_all_brnd_all_en_10/24_des_clicks_dribbble_sign-in%5Efix&amp;experiment_id=%5Eseo%5E%5Eseo-course">
            <video className="block w-full h-full max-h-[704px] object-cover" muted autoPlay loop src="https://cdn.dribbble.com/uploads/58489/original/9d10766cd3ed04dbbe770edb40140700.mp4?1727183698">
            </video>
          </a>
        </div>
      </div>
      <div className="relative flex items-center w-full h-full shadow-md max-laptop_sm:justify-center">
        <div className="ml-[100px] px-[60px] pt-[30px] w-full max-w-[536px] max-laptop_sm:ml-0">
          <h2 className="mb-10 text-2xl font-bold" style={{ fontFamily: "Mona-Sans" }}>Sign in to Dribbble</h2>
          <div className="h-14 w-full flex items-center justify-center rounded-[100px] border border-solid border-gray-200 cursor-pointer gap-4 font-semibold font-serif">
            <img src={googleIcon} className="h-[18px]" />
            Sign in with Google
          </div>
          <div className="relative flex items-center justify-center my-[30px] w-full">
            <hr className="w-full h-[1px] bg-gray-200 border-0" />
            <span className="absolute px-4 text-base text-gray-400 bg-white">
              or sign in with email
            </span>
          </div>
          <form onSubmit={handleLogin}>
            <div className=" mt-[14px] mb-[4px] w-full">
              <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Username or Email</p>
              <input
                className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className=" mt-[14px] mb-[4px] w-full">
              <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Password</p>
              <input
                className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-[#0c0c21] rounded-[100px] font-semibold text-white mt-5 h-14" type="submit">Sign in</button>
          </form>
          <p className="text-[#3d3b4e] text-center mt-5 text-sm">Dont't have an account? <Link to="/register" className="underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;