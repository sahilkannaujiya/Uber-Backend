import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../componants/CaptainDetails";
import RidePopUp from "../componants/RidePopUp";
import ConfirmRidePopUp from "../componants/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSocket } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useSocket();
  const { captain } = useContext(CaptainDataContext);

  // ==========================================
  // CAPTAIN SOCKET + LOCATION
  // ==========================================
  useEffect(() => {
    if (!socket || !captain?._id) return;

    const joinCaptain = () => {
      console.log("Captain joining socket...");

      socket.emit("join", {
        role: "captain",
        captainId: captain._id,
      });
    };

    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Captain location:", latitude, longitude);

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: latitude,
              lng: longitude,
            },
          });
        },
        (error) => {
          console.log("Geolocation Error:", error);
        }
      );
    };

    const handleConnect = () => {
      console.log("Captain socket connected:", socket.id);

      joinCaptain();
      updateLocation();
    };

    // If socket is already connected
    if (socket.connected) {
      handleConnect();
    }

    // If socket connects later
    socket.on("connect", handleConnect);

    // Update location every 10 seconds
    const intervalId = setInterval(() => {
      updateLocation();
    }, 10000);

    return () => {
      socket.off("connect", handleConnect);
      clearInterval(intervalId);
    };
  }, [socket, captain?._id]);

  // ==========================================
  // NEW RIDE LISTENER
  // ==========================================
  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log("🔥 NEW RIDE RECEIVED:", data);

      setRide(data);
      setRidePopupPanel(true);
      setConfirmRidePopupPanel(false);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  // ==========================================
  // CONFIRM RIDE
  // ==========================================
  const confirmRide = async () => {
    try {
      if (!ride?._id) {
        console.log("Ride ID is missing");
        return;
      }

      console.log("Confirming ride:", ride._id);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Ride confirmed:", response.data);

      setConfirmRidePopupPanel(false);
      setRidePopupPanel(false);
    } catch (error) {
      console.log(
        "Confirm ride error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // RIDE POPUP ANIMATION
  // ==========================================
  useGSAP(
    () => {
      if (!ridePopupPanelRef.current) return;

      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power2.in",
        });
      }
    },
    [ridePopupPanel]
  );

  // ==========================================
  // CONFIRM RIDE POPUP ANIMATION
  // ==========================================
  useGSAP(
    () => {
      if (!confirmRidePopupPanelRef.current) return;

      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power2.in",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-50">
        <img
          className="w-14"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
        />

        <Link
          to="/home"
          className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
        >
          <i className="ri-logout-box-r-line text-xl"></i>
        </Link>
      </div>

      {/* Background Image */}
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://i0.wp.com/newline.tech/wp-content/uploads/2018/09/uber-account-signup-1.jpg?resize=300%2C533&quality=89&ssl=1"
          alt="Captain"
        />
      </div>

      {/* Captain Details */}
      <div className="bg-white rounded-t-3xl p-5 -mt-4 relative">
        <CaptainDetails />

        {/* ==========================================
            RIDE POPUP
        ========================================== */}
        <div
          ref={ridePopupPanelRef}
          className="fixed w-full z-40 bottom-0 left-0 right-0 translate-y-full bg-white px-3 py-10"
        >
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>

        {/* ==========================================
            CONFIRM RIDE POPUP
        ========================================== */}
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed inset-x-0 bottom-0 z-50 translate-y-full bg-white rounded-t-3xl px-4 pt-12 pb-6 max-h-[90dvh] overflow-y-auto shadow-2xl"
        >
          <ConfirmRidePopUp
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
