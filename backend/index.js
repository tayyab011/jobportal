import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/api.js";

dotenv.config({});

import path from "path";

 const app= express();

 const _dirname = path.resolve();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());

export const JWT_KEY = "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRATION_TIME = "30d";
const corsOption = {
  origin: "http://localhost:5173", // ✅ Change to Vite's default port
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const MAX_JSON_SIZE = "50mb";
app.use(express.json({ limit: MAX_JSON_SIZE }));  /* onnk important api call er somoy edi lagboi */
app.use(cors(corsOption)); 
/* app.use(cors({ origin: "*", credentials: true })); */
app.use("/api", router);



app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});








mongoose
  .connect(process.env.Database, { autoIndex: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

 const port =process.env.PORT ||3000;
 app.listen(port,()=>{
    console.log(`server runnings at port ${port}`)
 })