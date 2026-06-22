import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
import {connectToDb} from "./db/index.js";
import { router as userRoutes } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { router as captainRoutes } from "./routes/captain.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send("helllo sahil you became backend engineer")
});
app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);

connectToDb()
export default app;