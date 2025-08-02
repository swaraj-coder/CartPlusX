import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-toastify";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const navigate = useNavigate();

  // ======== Email/Password Login =========
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login result:", result.data);
      toast.success("Login successful");
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  // ======== Google Login =========
  const googleLogin = async () => {
    try {
      setIsGoogleSigningIn(true);
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      console.log("Google login user:", result.data);
      toast.success("Google login successful");
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google login failed");
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Logo */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer absolute top-0 left-0"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[20px] font-sans">CartPlusX</h1>
      </div>

      {/* Heading */}
      <div className="w-full flex items-center justify-center flex-col gap-3 pt-[80px]">
        <span className="text-[23px] font-semibold">Login Page</span>
        <span className="text-[16px]">Welcome to CartPlusX, Place Your Order</span>
      </div>

      {/* Login Card */}
      <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg flex flex-col items-center justify-center mt-3 p-6">

        {/* Google Login Button */}
        <div
          onClick={googleLogin}
          className={`w-[90%] h-[40px] bg-[#42656cae] rounded-md flex items-center justify-center gap-3 cursor-pointer hover:bg-[#42656c] transition px-4 ${
            isGoogleSigningIn ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <img src={google} alt="Google" className="w-5 h-5 rounded-full object-cover" />
          {isGoogleSigningIn ? "Signing in..." : "Login with Google"}
        </div>

        {/* Divider */}
        <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px] my-3">
          <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          Or
          <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
        </div>

        {/* Email/Password Form */}
        <form
          onSubmit={handleLogin}
          className="w-[90%] flex flex-col items-center justify-start gap-[15px] relative"
        >
          <input
            type="email"
            className="w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-md shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] rounded-md shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {show ? (
              <IoMdEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[10px] top-[50%] -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[10px] top-[50%] -translate-y-1/2"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[100%] h-[50px] bg-[#6060f5] rounded-md flex items-center justify-center mt-[10px] text-[17px] font-semibold hover:bg-[#4e4edb] transition"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="flex gap-[10px] text-sm mt-2">
            Don't have an account?
            <span
              className="text-[#5555f6cf] font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
