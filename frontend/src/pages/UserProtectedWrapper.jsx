import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children, allowedRole }) => {
  const { user, setUser } = useContext(UserDataContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        if (allowedRole !== role) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [token, role, allowedRole, navigate, setUser]);

  return <>{children}</>;
};

export default UserProtectedWrapper;