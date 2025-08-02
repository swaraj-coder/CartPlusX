import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"
import back5 from "../assets/back5.jpg"

function Backgound({heroCount}) {
 if(heroCount === 0){
    return <img src={back2} alt="" className='w-full h-full float-right overflow-auto object-cover'/>
 }else if(heroCount ===1){
    return <img src={back1} alt="" className='w-full h-full float-right overflow-auto object-cover'/>
 }else if(heroCount ===2){
    return <img src={back3} alt="" className='w-full h-full float-right overflow-auto object-cover'/>
 }else if(heroCount ===3){
    return <img src={back4} alt="" className='w-full h-full float-right overflow-auto object-cover'/>
 }else if(heroCount ===4){
    return <img src={back5} alt="" className='w-full h-full float-right overflow-auto object-cover'/>
 }
}

export default Backgound