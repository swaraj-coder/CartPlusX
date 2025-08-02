import React from 'react'
 import Logo from "../assets/logo.png"
 import {useNavigate} from 'react-router-dom'
 import google from '../assets/google.png'
 import { IoEyeOutline } from "react-icons/io5";
 import { IoMdEye } from "react-icons/io";
 import {useState} from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';


 
 function Registration() {

  const [show, setShow] = useState(false);
  let {serverUrl}= useContext(authDataContext)
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let {userdata,getCurrentUser} =useContext(userDataContext)
  let navigate=useNavigate()

 

  const handelSignup =async (e)=>{
    e.preventDefault()
   
    try{
      const result =await axios.post(serverUrl + '/api/auth/register',{
        name,email,password

      },{withCredentials:true})
      getCurrentUser()
      navigate("/")
     
      console.log(result.data)
     

    }catch(error){
      console.log(error)

    }
  }

  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

const googleSignup = async () => {
  if (isGoogleSigningIn) return;
  setIsGoogleSigningIn(true);
  try {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    const name = user.displayName;
    const email = user.email;

    const result = await axios.post(
      serverUrl + "/api/auth/googlelogin",
      { name, email },
      { withCredentials: true }
    );
    console.log("User:", result.data);
     getCurrentUser()
     
    // Optionally redirect the user after successful login
    navigate("/"); // Or wherever appropriate
  } catch (error) {
    console.error("Google sign in error:");
    console.log("Code:", error.code);
    console.log("Message:", error.message);
    console.log("Full error object:", error);
  } finally {
    setIsGoogleSigningIn(false);
  }
};

 


   return (
     <div className=' min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]  text-white flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer absolute top-0 left-0' onClick={()=>navigate("/")}>
         <img className='w-[40px]'src={Logo} alt="" />
         <h1 className='text-[20px] font-sans'>CartPlusX</h1>
      </div>
      <div className='w-full flex items-center justify-center flex-col gap-3 pt-[80px] '>
        <span className='text-[23px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to CartPlusX,Place Your Order </span>
      </div>
      <div className='max-w-[600px] w-[90%] h-[420px] bg-[#00000025] border border-[#96969635] backdrop-blur-sm rounded-1g shadow-1g flex items-center justify-center  mt-3'>
       < form action="" onSubmit={handelSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
         <div className={`w-[90%] h-[40px] bg-[#42656cae] rounded-md flex items-center justify-center gap-3 cursor-pointer hover:bg-[#42656c] transition px-4 ${
    isGoogleSigningIn ? 'opacity-50 pointer-events-none' : ''
  }`}
  onClick={googleSignup}
                 >
          <img src={google} alt=""className='w-5 h-5 rounded-full object-cover '/>Registration With Google

         </div>
         <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
          <div className='w-[40%] h-[1px] bg-[#96969635]'></div>Or<div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>
          <div className='w-[90%] h-[260px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input type="text" className='w-[100%] h-[60px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-md shadow-1g bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName'required onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="text" className='w-[100%] h-[60px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-md shadow-1g bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email'required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type={show? "text":"password" } className='w-[100%] h-[60px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-md shadow-1g bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password'required  onChange={(e)=>setPassword(e.target.value)} value={password}/>
            {!show &&<IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'onClick={()=>setShow(prev=> !prev)} />}
            {show && <IoMdEye  className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]'onClick={()=>setShow(prev=> !prev)} />}
           


            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-md flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
            <p className='flex gap-[10px]'>You have any account?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'onClick={()=>navigate("/login")}>Login</span></p>
          </div>

         
       </form>

      </div>
       
     </div>
   )
 }
 
 export default Registration
