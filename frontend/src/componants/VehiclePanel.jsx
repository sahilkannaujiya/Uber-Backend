import React from "react";

function VehiclePanel(props) {
  return (
    <div>
      <h5
        className="p-2 text-center w-[95%] absolute top-0 "
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicleType("car");
          props.setVehiclePanel(false)
        }}
        className="flex w-full items-center justify-between active:border-2 border-black rounded-xl p-3 mb-3"
      >
        <img
          className="h-10"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/794/782/small/isometric-car-icon-isolated-on-white-free-vector.jpg"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare?.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicleType("motorcycle");
          props.setVehiclePanel(false)
        }}
        className="flex w-full items-center justify-between active:border-2 border-black rounded-xl p-3 mb-3"
      >
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">6 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afordable, motor cylce rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicleType("auto");
          props.setVehiclePanel(false)
        }}
        className="flex w-full items-center justify-between active:border-2 border-black rounded-xl p-3 mb-3"
      >
        <img
          className="h-12"
          src="https://static.vecteezy.com/system/resources/thumbnails/035/175/313/small/thailand-car-isolated-on-background-3d-rendering-illustration-free-png.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            UberAuto{" "}
            <span>
              <i className="ri-user-fill"></i>
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">4 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afordable, auto-rickshaw rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicleType("bicycle");
          props.setVehiclePanel(false)
        }}
        className="flex w-full items-center justify-between active:border-2 border-black rounded-xl p-3 mb-3"
      >
        <img
          className="h-12"
          src="https://img.freepik.com/premium-vector/bicycle-eco-friendly-cycling-vector-illustration-flat-style-white-isolated-background_499863-57.jpg"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-xl">
            UberBycyle{" "}
            <span>
              <i className="ri-user-fill"></i>
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">1 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afordable, Bycycle air rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.bicycle}</h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
