import React, { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstname, setfirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [vehicleColor, setVehicleColor] = React.useState("");
  const [vehiclePlate, setVehiclePlate] = React.useState("");
  const [vehicleCapacity, setVehicleCapacity] = React.useState("");
  const [vehicleType, setVehicleType] = React.useState("");
  const [captainData, setCaptainData] = React.useState({});

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    //console.log(captainData);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
      captainData,
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain/home");
    }

    setEmail("");
    setfirstname("");
    setLastname("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6e9SI9CUikX9jcWGqZEHkPCBTOV3LYz2evqjx-JJ04Q&s=10"
          alt=""
        />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>

          <div className="flex gap-4 mb-6">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />

            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 w-full rounded px-4 py-2 border text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 👇 VEHICLE DETAILS SECTION */}
          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>

          <div className="flex gap-4 mb-6">
            <input
              required
              className="bg-[#eeeeee] mb-4 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] mb-4 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate Number"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              required
              className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />

            <select
              required
              className="bg-[#eeeeee] mb-6 w-1/2 rounded px-4 py-2 border text-lg"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="bicycle">Bicycle</option>
              <option value="auto-rickshaw">Auto Rickshaw</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg">
            Create Captain Account
          </button>
        </form>

        <p className="text-center">
          Already have an account?
          <a href="/captain/login" className="text-blue-600">
            {" "}
            Login as a Captain
          </a>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms and Services apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
