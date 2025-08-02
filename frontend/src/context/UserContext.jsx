
import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

export const userDataContext =createContext()

function UserContext({children}) {
    let [userData,setUserData] =useState("")
    let {serverUrl}=useContext(authDataContext)

     const getCurrentUser = async () => {
        try {
            let result= await axios.get("http://localhost:3000/api/user/getcurrentuser",{withCredentials:true})

            setUserData(result.data)
            console.log(result.data)
            
        } catch (error) {
             setUserData(null)
             
             console.log(error)
            
        }
        
    }

    useEffect(() =>{
        getCurrentUser()
    },[])

    let value ={
        userData,setUserData,getCurrentUser

    }
   
  return (
    <div>
       
        < userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
      
    </div>
  )
}

export default UserContext
