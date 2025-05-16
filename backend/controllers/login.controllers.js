import sqlUtils from "../utils/sql.js"; // Importar como exportación por defecto
import { verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

const { sqlConnect, sql } = sqlUtils; // Desestructurar

// Simple session storage (in production, use a proper session store)
const sessions = new Map();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                isLogin: false, 
                message: "Username and password are required" 
            });
        }

        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, username)
            .query("SELECT * FROM users WHERE username = @username");

        if (data.recordset.length === 0) {
            return res.status(401).json({ 
                isLogin: false, 
                message: "User not found" 
            });
        }

        const user = data.recordset[0];
        const isValidPassword = verifyPassword(password, user.password, user.salt);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                isLogin: false, 
                message: "Incorrect password" 
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({ 
            isLogin: true, 
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            isLogin: false, 
            message: "Server error" 
        });
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