import bcrypt from 'bcrypt' 
import User from "../models/User.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async(req,res)=>{
    try {
        let {fullname,username,password,confirmpassword,gender} = req.body;
        if ( password !== confirmpassword ) {
           return res.status(400).json({error:"Password and confirmpassword donot match"});
        }

        let user = await User.findOne({username});

        if ( user ) {
           return res.status(400).json({error:"User already exists"});
        }
        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullname,
            username,
            password : hashedPassword,
            gender,
            profilePic : gender === "male" ? boyprofilePic : girlprofilePic,
        });

        if (newUser) { 

        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

      return res.status(201).json({
        id : newUser._id,
        fullname : newUser.fullname,
        username : newUser.username,
        password : newUser.password,
        gender : newUser.gender,
        profilePic : newUser.profilePic
       });


        } else {
           return res.status(400).json({error:"Invalid user data"});
        }
       

    } catch (error) {
       return res.status(500).json({error:"server error"});
    }
    
}

export const login = async(req,res)=>{
    try {
        
        let {username,password} = req.body;
        let user = await User.findOne({username});
        let isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if ( !user || !isPasswordCorrect ) {
         return res.status(400).json({error: "Incorrect password or username"});
        }
     
        generateTokenAndSetCookie(user._id,res);

        return res.status(201).json({
         _id : user._id,
         fullname : user.fullname,
         username : user.username,
         profilePic : user.profilePic,
        });

    } catch (error) {
        return res.status(500).json({error:"server error"});
    }
  
}

export const logout = (req,res)=>{
   try {
    res.cookie( "jwt", "", {maxAge:0} );
    res.status(201).json({message : "Logged out successfully"});
   } catch (error) {
    return res.status(500).json({error:"server error"});
   }
}



