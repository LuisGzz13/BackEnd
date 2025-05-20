import User from "../utils/user.model.js";
import { verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

// Simple session storage (in production, use a proper session store)
const sessions = new Map();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ isLogin: false, message: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ isLogin: false, message: "User not found" });
        }
        const isValidPassword = verifyPassword(password, user.password, user.salt);
        if (!isValidPassword) {
            return res.status(401).json({ isLogin: false, message: "Incorrect password" });
        }
        const token = generateToken(user);
        res.status(200).json({ isLogin: true, message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ isLogin: false, message: "Server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ isAuthenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        res.json({ 
            isAuthenticated: true,
            username: decoded.username
        });
    } catch (error) {
        res.status(401).json({ isAuthenticated: false });
    }
};

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        if (sessionId) {
            sessions.delete(sessionId);
            res.clearCookie('sessionId');
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};