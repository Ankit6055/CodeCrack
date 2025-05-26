import jwt from "jsonwebtoken";
import {db} from "../libs/db.js"

export const authMiddleware = async (req , res , next)=>{
    console.log("[AuthMiddleware] Triggered for path:", req.path);
    try {
        console.log("[AuthMiddleware] Cookies received:", req.cookies);
        const token = req.cookies.jwt;

        if(!token){
            console.log("[AuthMiddleware] Unauthorized - No token provided in cookies.");
            return res.status(401).json({
                message:"Unauthorized - No token provided"
            })
        }
        console.log("[AuthMiddleware] Token found in cookies:", token ? token.substring(0, 20) + "..." : "undefined");


        let decoded;

        try {
            console.log("[AuthMiddleware] Verifying token with JWT_SECRET:", process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 10) + "..." : "JWT_SECRET NOT SET!");
            decoded = jwt.verify(token , process.env.JWT_SECRET);
            console.log("[AuthMiddleware] Token decoded successfully. Decoded payload:", decoded);
        } catch (error) {
            console.log("[AuthMiddleware] Unauthorized - Invalid token. Verification error:", error.message);
            return res.status(401).json({
                message:"Unauthorized - Invalid token"
            })
        }

        console.log("[AuthMiddleware] Finding user with ID from token:", decoded.id);
        const user = await db.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        });


        if(!user){
            console.log("[AuthMiddleware] User not found in database for ID:", decoded.id);
            return res.status(404).json({message:"User not found"});
        }
        console.log("[AuthMiddleware] User found in database:", user);

        req.user = user;
        next();

    } catch (error) {
        console.error("[AuthMiddleware] Error authenticating user:", error);
        res.status(500).json({message:"Error authenticating user"});
    }
}


export const checkAdmin  = async(req , res , next)=>{
    try {
        const userId = req.user.id;
        
        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })

        if(!user || user.role !== "ADMIN"){
            return res.status(403).json({
                message:"Access denied - Admins only"
            })
        }

        next();
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({message:"Error checking admin role"});
    }
}