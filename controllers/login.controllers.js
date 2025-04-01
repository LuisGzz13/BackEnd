import sqlUtils from "../utils/sql.js"; // Importar como exportación por defecto
import { verifyPassword } from "../utils/password.js";

const { sqlConnect, sql } = sqlUtils; // Desestructurar

export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username = @username");

        if (data.recordset.length === 0) {
            return res.status(401).json({ isLogin: false, message: "Usuario no encontrado" });
        }

        const user = data.recordset[0];
        const isValidPassword = verifyPassword(req.body.password, user.password, user.salt);
        
        res.status(200).json({ isLogin: isValidPassword });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ isLogin: false, message: "Error del servidor" });
    }
};

export const register = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await pool
            .request()
            .input("username", sql.VarChar, username)
            .query("SELECT * FROM users WHERE username = @username");

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ success: false, message: "El usuario ya existe" });
        }

        // Generate salt and hash password
        const salt = generateSalt();
        const hashedPassword = hashPassword(password, salt);

        // Insert new user
        await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, hashedPassword)
            .input("salt", sql.VarChar, salt)
            .query("INSERT INTO users (username, password, salt) VALUES (@username, @password, @salt)");

        res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};