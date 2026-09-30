import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[95%] absolute top-0 "
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-3xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-3 justify-between flex-col items-center">
        <img
          className="h-30"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/794/782/small/isometric-car-icon-isolated-on-white-free-vector.jpg"
          alt=""
        />
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-2 border-b-1">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-medium -mt-1 text-gray-600">
              {props.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-2 border-b-1">
          <i className="text-lg ri-focus-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">54/69-H</h3>
            <p className="text-medium -mt-1 text-gray-600">
              {props.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-2">
          <i className="text-lg ri-wallet-3-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
            <p className="text-medium -mt-1 text-gray-600">
              Cash
            </p>
          </div>
        </div>
      </div>

      <button onClick={()=>{
        props.createRide();
        props.setVehicleFound(true);
        props.setConfirmRidePanel(false)

      }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRide;
