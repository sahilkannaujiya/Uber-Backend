import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[95%] absolute top-0 "
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-3xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-5">
  <div className="flex items-center gap-4">
    <img
      className="h-14 w-14 rounded-full object-cover border border-gray-200"
      src="https://www.shutterstock.com/image-photo/girl-dark-hair-sunglasses-brown-600w-1929711122.jpg"
      alt="Passenger"
    />

    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        { props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
      </h2>
      <p className="text-sm text-black-500">
        Passenger
      </p>
    </div>
  </div>

  <div className="text-right">
    <h5 className="text-lg font-bold text-black-900">
      2.7 km
    </h5>
    <p className="text-sm text-black">
      Away
    </p>
  </div>
</div>

      <div className="flex gap-3 justify-between flex-col items-center"></div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-2 border-b-1">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-medium -mt-1 text-gray-600">
              {props.ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-2 border-b-1">
          <i className="text-lg ri-focus-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">54/69-H</h3>
            <p className="text-medium -mt-1 text-gray-600">
              {props.ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-2">
          <i className="text-lg ri-wallet-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-medium -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <div className="flex mt-5 w-full items-center justify-between">
        <button
        onClick={() => {
          props.setRidePopupPanel(false);
          props.confirmRide();
        }}
        className="mt-1 bg-gray-200 text-gray-800  font-semibold p-3 px-10  rounded-lg"
      >
        Ignore
      </button>
      <button
        onClick={() => {
          props.setConfirmRidePopupPanel(true)
        }}
        className=" bg-black text-white font-semibold p-3 px-10 rounded-lg"
      >
        Accept
      </button>

      </div>
      
      
    </div>
  );
};

export default RidePopUp;
