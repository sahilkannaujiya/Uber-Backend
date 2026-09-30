import React, { useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../componants/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanle, setFinishRidePanel] = useState(false);
  const finishRidePanleRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanle) {
        gsap.to(finishRidePanleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanle],
  );

  return (
    <div className="h-screen relative">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-50">
        <img
          className="w-14"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
        />

        <Link
          to="/captain/home"
          className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
        >
          <i className="ri-logout-box-r-line text-xl"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://i0.wp.com/newline.tech/wp-content/uploads/2018/09/uber-account-signup-1.jpg?resize=300%2C533&quality=89&ssl=1"
          alt=""
        />
      </div>
      <div
        onClick={() => {}}
        className="h-1/5 p-6 flex items-center relative justify-between bg-gray-50 pt-10"
      >
        <h5
          className="p-2 text-center w-[90%] absolute top-0 "
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <i className=" text-3xl ri-arrow-down-wide-fill"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className=" bg-black text-white font-semibold p-3 px-10 rounded-lg"
        >
          Compete Ride
        </button>
      </div>

      <div
        ref={finishRidePanleRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-14"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
