import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
  const navigate = useNavigate()
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        navigate('/login')
      }
    });

  return <div>UserLogout</div>;
};

export default UserLogout;
