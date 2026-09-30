import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios"

const UserLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [userData, setUserData] = React.useState({});

  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }
    //console.log(email, password);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, userData);

    if(response.status == 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      //console.log(data.user.role);
      
      navigate('/home')
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20  mb-10"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
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
            <a href="/signup" className="text-blue-600">
              {" "}
              Create an account
            </a>
          </p>
        </form>
      </div>
      <div>
        <a href="/captain/login" className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder: text-base">
          {" "}
          Sign in as Captain
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
