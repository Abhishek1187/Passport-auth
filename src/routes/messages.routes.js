import express from "express";
import { profile } from "../controllers/message.controller.js";
import { User } from "../mongoose/schema/user.js";

const router = express.Router();

//router.post("/profile" , profile);
router.post("/users" , async (request , response) =>{
  const { body } = request;
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return response.status(400).send({ message: "Error creating user", error: err.message });
  }
});

export default router;