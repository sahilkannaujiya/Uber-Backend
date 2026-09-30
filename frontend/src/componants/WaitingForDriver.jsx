import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[95%] absolute top-0 "
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="mt-4 mb-8">
        <h3 className="text-2xl font-semibold">Meet at your pickup spot</h3>
        <p className="text-gray-500">Your driver will arrive in 3 min</p>
      </div>

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
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-medium -mt-1 text-gray-600">
              Kankariya Talab, Alahabad
            </p>
          </div>
        </div>
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

        <button className="w-full mt-5 bg-red-500 text-white font-semibold p-3 rounded-lg">
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default WaitingForDriver;
