import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div className="relative p-5">
      {/* Close */}
      <h5
        className="absolute top-2 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-500"></i>
      </h5>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mt-8 mb-6">Ride Completed</h3>

      {/* Passenger */}
      <div className="flex items-center gap-4 pb-5 border-b">
        <img
          className="h-14 w-14 rounded-full object-cover"
          src="https://www.shutterstock.com/image-photo/girl-dark-hair-sunglasses-brown-600w-1929711122.jpg"
          alt="Passenger"
        />

        <div>
          <h2 className="text-lg font-semibold">Aisah Khan</h2>
          <p className="text-sm text-gray-500">Passenger</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-4">
          <i className="ri-map-pin-2-fill text-xl"></i>

          <div>
            <h4 className="font-semibold">Pickup</h4>
            <p className="text-sm text-gray-500">
              562/11-A, Kankariya Talab, Allahabad
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <i className="ri-flag-2-fill text-xl"></i>

          <div>
            <h4 className="font-semibold">Drop-off</h4>
            <p className="text-sm text-gray-500">
              54/69-H, Bleaker Street, Allahabad
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <i className="ri-wallet-3-fill text-xl"></i>

          <div>
            <h4 className="font-semibold">Earnings</h4>
            <p className="text-sm text-gray-500">Cash • ₹193.20</p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <Link
        
        onClick={() => props.setFinishRidePanel(false)}
        className=" flex items-center justify-center w-full mt-8 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
      >
        Done
      </Link>
    </div>
  );
};

export default FinishRide;
