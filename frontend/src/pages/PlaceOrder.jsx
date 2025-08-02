import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  let navigate =useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const initPay =(order)=>{
    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description:'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

      const {data} =await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
      if(data){
        navigate("/order")
        setCartItem({})
      }
    
        
      }
    }
      const rzp= new window.Razorpay(options)
        rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          console.log(result.data)

          if(result.data){

        
          setCartItem({})
          navigate("/order")
          }else{
            console.log(result.data.message)
          }
          break

          case 'razorpay':
            const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, {withCredentials:true})
            if(resultRazorpay.data){
              initPay(resultRazorpay.data)
            }
            break;
        default:
          break;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const inputStyle = 'bg-[#2c3e50] text-white placeholder:text-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-600'

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-28 pb-32 px-4 flex justify-center'>
      <div className='w-full max-w-7xl flex flex-col gap-12'>

        
      
        {/* Flex container: DELIVERY and PAYMENT */}
        <form onSubmit={onSubmitHandler} className='w-full flex flex-col lg:flex-row gap-12'>

          {/* LEFT: DELIVERY INFORMATION */}
          <div className='w-full lg:w-1/2 flex flex-col gap-5'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />

            <div className='flex flex-row flex-wrap gap-4'>
              <input type="text" placeholder='First name' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='firstName' value={formData.firstName} />
              <input type="text" placeholder='Last name' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
            </div>

            <input type="email" placeholder='Email address' className={inputStyle} required onChange={onChangeHandler} name='email' value={formData.email} />
            <input type="text" placeholder='Street' className={inputStyle} required onChange={onChangeHandler} name='street' value={formData.street} />

            <div className='flex flex-row flex-wrap gap-4'>
              <input type="text" placeholder='City' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='city' value={formData.city} />
              <input type="text" placeholder='State' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='state' value={formData.state} />
            </div>

            <div className='flex flex-row flex-wrap gap-4'>
              <input type="text" placeholder='Pincode' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
              <input type="text" placeholder='Country' className={`${inputStyle} flex-1 min-w-[45%]`} required onChange={onChangeHandler} name='country' value={formData.country} />
            </div>

            <input type="text" placeholder='Phone' className={inputStyle} required onChange={onChangeHandler} name='phone' value={formData.phone} />
          </div>

          {/* RIGHT: CART TOTAL + PAYMENT METHOD + BUTTON */}
          <div className='w-full lg:w-1/2 flex flex-col items-center gap-8'>
            <CartTotal />

            <div className='w-full'>
              <Title text1={'PAYMENT'} text2={'METHOD'} />

              <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-4'>
                <button
                  type="button"
                  onClick={() => setMethod('razorpay')}
                  className={`w-[160px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[5px] border-blue-900' : ''}`}
                >
                  <img
                    src={razorpay}
                    className='w-full h-full object-fill rounded-sm'
                    alt="Razorpay"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('cod')}
                  className={`w-[230px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-sm px-4 rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900' : ''}`}
                >
                  CASH ON DELIVERY
                </button>
              </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              type='submit'
              className='bg-[#3da0b1] text-white px-6 py-3 cursor-pointer rounded-xl border border-gray-400 w-fit mt-6 
             transition-all duration-300 ease-in-out 
             shadow-md hover:shadow-[0_0_15px_#3bcee8] hover:scale-105 active:scale-95 active:shadow-none'
            >
              PLACE ORDER
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default PlaceOrder
