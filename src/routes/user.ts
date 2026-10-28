import { Router } from "express";
import { UserType } from "../zodTypes/userTypes.ts";
import { prisma } from "../db/client.ts";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";

export const userRouter = Router();


const JWT_SECRET = process.env.JWT_SECRET


userRouter.post("/signup", async (req,res)=>{
    try{
        const userBody = UserType.safeParse(req.body);
        if (!userBody.success){return res.status(400).json({error:userBody.error.flatten})}


            const existingUser = await prisma.user.findUnique({
                where:{
                    email: userBody.data?.email
                }
            }) 

        if(!existingUser){
            const hashedPassword = await bcrypt.hash(userBody.data.password, 10)
            const user = await prisma.user.create({
                data:{
                    email:userBody.data.email,
                    password: hashedPassword,
                    name:userBody.data.name
                }
            })

            res.status(201).json({msg:"User created successfully", user})
        }else{
            res.status(409).json({msg:"User already exists"})
        }
    



    }catch{
        res.status(500).json({msg:"Server Error"})
    }
})


userRouter.post("/login", async (req,res)=>{
    try{
        const userBody = UserType.safeParse(req.body)
        if(!userBody.success){return res.status(400).json({error:userBody.error.flatten})}

        const existingUser = await prisma.user.findUnique({
            where:{
                email:userBody.data.email
            }
        })

        if(!existingUser){return res.status(401).json({msg:"No such user exists!"})}


        const passwordMatch = await bcrypt.compare(userBody.data.password, existingUser.password)
        if(existingUser && passwordMatch){
            if(!JWT_SECRET){throw new Error("Need a JWT secret")}
            const token = jwt.sign({userId:existingUser.id},JWT_SECRET)
            
            res.json({
                msg:"User has logged in",
                token
            })
        }

        
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
})


userRouter.get("/myMails", (req,ress)=>{

})