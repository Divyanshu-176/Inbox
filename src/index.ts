import express from "express";
import userRouter from "./routes/user.js";


const app = express();

app.use(express.json())

app.use("/api/v1/user", userRouter)
// app.use("/api/v1/acceptMail", mailRouter)





app.listen(3000, ()=>{console.log("Running on port 3000")})