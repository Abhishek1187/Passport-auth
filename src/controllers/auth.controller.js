import express from "express";


export const signUp = ( req , res) => {

  const { fullname , email , password } = req.body;

  try {
    if(!fullname || !email || !password) {
      return res.status(400).json({message: "all fields are required"})
    }

    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"})
    }

  } catch (error) {
    console.log("error in signup controller",error)
    res.status(500).json({message: "internal server error"})
    
  }

}

export const login = ( req , res) => {

const {email , password} = req.body;

if( !email || !password){
  res.status(400).json({message: "all fields are required"})
} 

res.status(200).json({message: "login sucessfull"})

}