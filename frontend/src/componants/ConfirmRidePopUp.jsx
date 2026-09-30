import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <div className="w-full bg-white rounded-t-3xl px-4 sm:px-6 py-4">
      <h5
        className="absolute top-2 left-0 right-0 flex justify-center cursor-pointer"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-gray-500 text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-5">
        Confirm this ride to start...
      </h3>
      <div className="flex items-center justify-between  bg-gray-100 border border-gray-200 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border border-gray-200"
            src="https://www.shutterstock.com/image-photo/girl-dark-hair-sunglasses-brown-600w-1929711122.jpg"
            alt="Passenger"
          />

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg truncate font-semibold">Aisha khan</h2>
            <p className="text-sm text-grayk-500">Passenger</p>
          </div>
        </div>

        <div className="text-right">
          <h5 className="text-base sm:text-lg font-bold ">2.7 km</h5>
          <p className="text-sm text-gray-500">Away</p>
        </div>
      </div>

      <div className="flex gap-3 justify-between flex-col items-center"></div>
      <div className="w-full  rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-start gap-4 p-4 border-b">
          <i className="text-xl ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-base font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-500">
              Kankariya Talab, Alahabad
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 border-b">
          <i className="text-xl ri-focus-3-fill"></i>
          <div>
            <h3 className="text-base font-semibold">54/69-H</h3>
            <p className="text-sm text-gray-500">
              Bleaker street, Alahabad
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4">
          <i className="text-xl ri-wallet-3-fill"></i>
          <div>
            <h3 className="text-base font-semibold">₹193.20</h3>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <input value={otp} onChange={(e) => {
            setOtp(e.target.value)
          }} className="w-full mt-5 rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Enter OTP" />
          <Link
            to="/captain/riding"
            onClick={() => {}}
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-black py-3 text-white font-semibold hover:bg-gray-900 transition"
          >
            Confirm
          </Link>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(false);
              props.setRidePopupPanel(false);
            }}
            className="mt-3 w-full rounded-xl bg-gray-200 py-3 font-semibold text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
