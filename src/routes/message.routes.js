import express from "express";
import { profile } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/profile" , profile);
//router.post("/contacts" , contacts);

export default router;