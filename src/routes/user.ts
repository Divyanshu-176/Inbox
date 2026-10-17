import { Router } from "express";
import bcrypt from "bcrypt"
import { Signupbody } from "../zod/index.js";

const userRouter = Router();

userRouter.post("/signup", (req,res)=>{

    try{
        const signupBody = req.body;
        const parsedSignupBody = Signupbody.safeParse(signupBody);
        if(!parsedSignupBody.success){
            res.json({message:"Credentials in wrong format"})
        }

        const hashedPassword = bcrypt.hash(signupBody.data.password,10)
        

    }catch{
        res.json({message:"Server Error "})
    }


});

userRouter.post("/login", (req,res)=>{

});


export default userRouter;