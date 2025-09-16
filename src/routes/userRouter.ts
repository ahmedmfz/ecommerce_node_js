import express from "express";
import { registerUser, loginUser } from "../services/userService";

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await registerUser(req.body);
    res.status(user.status).json(user.data);
});


userRouter.post("/login", async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    
    const user = await loginUser(req.body);
    res.status(user.status).json(user.data);
});


export default userRouter;