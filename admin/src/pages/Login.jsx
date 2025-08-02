import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
 import { IoMdEye } from "react-icons/io";
 import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';





function Login() {
  
   const [show, setShow] = useState(false);
      let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")
      let {serverUrl} = useContext(authDataContext)
      let {adminData,getAdmin} =useContext(adminDataContext)
      let navigate =useNavigate()


      const AdminLogin =async (e) => {
        e.preventDefault()
        try {
          const result = await axios.post(serverUrl + '/api/auth/adminlogin',{email,password},{withCredentials:true})
          console.log(result.data)
          toast.success("Admin Login Successfully")
          getAdmin()
          navigate("/")
        } catch (error) {
          console.log(error)
          toast.error("Admin Login Failed")
          
        }
      }
  return (
   <div className=' min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025]  text-white flex flex-col items-center justify-start'>
         <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer absolute top-0 left-0' >
            <img className='w-[40px]'src={logo} alt="" />
            <h1 className='text-[20px] font-sans'>CartPlusX</h1>
         </div>
         <div className='w-full flex items-center justify-center flex-col gap-3 pt-[80px] '>
           <span className='text-[23px] font-semibold'>Login Page</span>
           <span className='text-[16px]'>Welcome to CartPlusX , Apply to Admin Login </span>
         </div>
         <div className='max-w-[600px] w-[90%] h-[350px] bg-[#00000025] border border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center  mt-3' >
          < form action="" onSubmit={AdminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
            
            
             <div className='w-[90%] h-[290px] flex flex-col items-center justify-center gap-[22px] relative'>
              
               <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-md shadow-1g bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email'required onChange={(e)=>setEmail(e.target.value)} value={email}/>
               <input type={show? "text":"password" } className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-md shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password'required  onChange={(e)=>setPassword(e.target.value)} value={password}/>
               {!show &&<IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[46%] translate-y-[-50%]'onClick={()=>setShow(prev=> !prev)} />}
               {show && <IoMdEye  className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[46%] translate-y-[-50%]'onClick={()=>setShow(prev=> !prev)} />}
              
   
   
               <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-md flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
             
             </div>
   
            
          </form>
   
         </div>
          
        </div>
  )
}

export default Login
