import { Server } from "socket.io";
import User from "./models/user.models.js";
import Captain from "./models/captain.models.js";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {

    socket.on("join", async (data) => {
      const { role, userId, captainId } = data;

      if (role === "user") {
        const user = await User.findByIdAndUpdate(
          userId,
          { socketId: socket.id },
          { new: true }
        );

        //console.log("Updated User:", user);

        if (user) {
          socket.join(`user_${userId}`);
        }
      } else if (role === "captain") {
        const captain = await Captain.findByIdAndUpdate(
          captainId,
          { socketId: socket.id },
          { returnDocument: "after" }
        );

        //console.log("Updated Captain:", captain);

        if (captain) {
          socket.join(`captain_${captainId}`);
        }
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;

        const captain = await Captain.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [location.lng, location.ltd],
            },
          },
          {
            returnDocument: "after",
          }
        );

        //console.log("Updated Captain:", captain);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected : ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.error("Socket.io is not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
