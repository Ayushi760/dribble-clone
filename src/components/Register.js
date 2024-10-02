import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";
import wixIcon from "../assets/wixicon.svg"
import googleIcon from "../assets/google.svg"
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser } from "../api/api";

const Register = () => {
    const { dispatch, state } = useContext(GlobalStateContext);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (state.isAuthenticated) {
            navigate("/"); // Redirect to home page
        }
    }, [state.isAuthenticated, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset error message and success message
        setErrorMessage("");
        setSuccessMessage("");

        // Set loading to true
        dispatch({ type: "SET_LOADING", payload: true });

        try {
            // Call the register API
            const savedUser = await registerUser(fullname, username, email, password);

            // Dispatch action to store in global state
            dispatch({ type: "REGISTER", payload: savedUser });

            // Set success message
            setSuccessMessage("Registration successful!");

            // Reset form fields
            setFullname("");
            setUsername("");
            setEmail("");
            setPassword("");

            // Redirect to login after 2000 ms
            setTimeout(() => {
                navigate("/login"); // Redirect to login page
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message); // Display error message
        } finally {
            // Set loading to false
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="max-w-[388px] h-full relative">
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
            <div className="w-full shadow-md relative flex items-center h-full">
                <div className="ml-[100px] px-[60px] pt-[16px] w-full max-w-[536px]">
                    <h2 className="mb-6 font-bold text-2xl" style={{ fontFamily: "Mona Sans" }}>Sign up to Dribbble</h2>
                    <div className="h-14 w-full text-white text-sm flex items-center justify-center rounded-[100px] bg-black cursor-pointer gap-4 font-semibold font-serif">
                        <img src={googleIcon} className="h-[18px]" />
                        Sign up with Google
                    </div>
                    <div className="relative flex items-center justify-center my-[30px] w-full">
                        <hr className="w-full h-[1px] bg-gray-200 border-0" />
                        <span className="absolute px-4 text-base text-gray-400 bg-white">
                            or
                        </span>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="w-full flex gap-4">
                            <div className=" mt-[14px] mb-[4px] w-full">
                                <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Name</p>
                                <input
                                    className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className=" mt-[14px] mb-[4px] w-full">
                                <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Username</p>
                                <input
                                    className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className=" mt-[14px] mb-[4px] w-full">
                            <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Email</p>
                            <input
                                className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className=" mt-[14px] mb-[4px] w-full">
                            <p className="text-[15px] font-bold text-[#0c0c21] mb-2">Password</p>
                            <input
                                className="h-14 p-4 w-full border border-gray-200 rounded-xl outline-none bg-white text-gray-900 transition duration-300 ease-in-out hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-pink-300"
                                type=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                min={6}
                                placeholder="6+ Characters"
                            />
                        </div>
                        <div className=" mt-[14px] mb-[4px] w-full flex gap-2">
                            <input type="checkbox" id="agree" required/>
                            <p className="text-sm text-gray-700">I agree with Dribbble's Terms of Service, Privacy Policy, and default Notification Settings.</p>
                        </div>
                        <button className="w-full bg-[#0c0c21] rounded-[100px] font-semibold text-white mt-5 h-14" type="submit">Create Account</button>
                    </form>
                    <p className="text-[#3d3b4e] text-center mt-5 text-sm">Already have an account? <Link to="/login" className="underline">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;