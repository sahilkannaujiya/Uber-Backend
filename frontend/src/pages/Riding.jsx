import React from 'react'
import {Link} from "react-router-dom"

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to="/home" className='fixed right-2 top-2 h-12 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className=" text-lg ri-home-4-fill"></i>
      </Link>
      <div className='h-1/2'>
        <img
          className="h-full w-full object-cover"
          src="https://i0.wp.com/newline.tech/wp-content/uploads/2018/09/uber-account-signup-1.jpg?resize=300%2C533&quality=89&ssl=1"
          alt=""
        />
      </div>
      <div className='h-1/2 p-4'>
      <div className="flex items-center justify-between">
        <img
          className="h-20"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/794/782/small/isometric-car-icon-isolated-on-white-free-vector.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium"> Sahil</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">DL01 AB 5784</h4>
          <p className="text-sm text-gray-600">BMW M-class</p>
        </div>
      </div>

      <div className="flex gap-3 justify-between flex-col items-center"></div>
      <div className="w-full mt-5">
        
        <div className="flex items-center gap-5 p-2 border-b-1">
          <i className="text-lg ri-focus-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-medium -mt-1 text-gray-600">
              Kankariya Talab, Alahabad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-2">
          <i className="text-lg ri-wallet-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹193.20</h3>
            <p className="text-medium -mt-1 text-gray-600">
              Kankariya Talab, Alahabad
            </p>
          </div>
        </div>

      </div>
      <button className="w-full mt-5 bg-green-500 text-white font-semibold p-3 rounded-lg">Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding