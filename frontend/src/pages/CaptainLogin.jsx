import React from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const {captain, setCaptain} = React.useContext(CaptainDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email,
      password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/login`,captainData)
    // console.log(response.data);
    
    if(response.status === 200){
      const data = response.data;
      
      
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.captain.role )
      // console.log(data.captain.role);
      // console.log(response.data);
      
      navigate('/captain/home')
    }
    //console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20  mb-10 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6e9SI9CUikX9jcWGqZEHkPCBTOV3LYz2evqjx-JJ04Q&s=10"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2"> Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder: text-base">
            Login
          </button>
          <p className="text-center">
            New here?
            <a href="/captain/signup" className="text-blue-600">
              {" "}
              Register as a Captain
            </a>
          </p>
        </form>
      </div>
      <div>
        <a
          href="/login"
          className="bg-[#457856] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder: text-base"
        >
          {" "}
          Sign in as User
        </a>
      </div>
    </div>
  );
};

export default CaptainLogin;
