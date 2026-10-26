import express from "express";
import { userRouter } from "./routes/user.js";
import { mailRouter } from "./routes/mail.js";




const app = express();


app.use("/user/api/v1", userRouter)
app.use("/mail/api/v1", mailRouter)


app.listen(3000, ()=>{console.log("Listening on 3000")})