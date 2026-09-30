import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children, allowedRole }) => {
  const { setCaptain } = useContext(CaptainDataContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaptainData = async () => {
      try {
        if (!token) {
          navigate("/captain/login");
          return;
        }

        if (role !== allowedRole) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Captain Profile Response:", response.data);

        setCaptain(response.data.captain);
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        navigate("/captain/login");
      }
    };

    fetchCaptainData();
  }, [token, role, allowedRole, navigate, setCaptain]);

  if (!token || role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;