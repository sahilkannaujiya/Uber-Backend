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
    console.log(`A user connected : ${socket.id}`);

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
