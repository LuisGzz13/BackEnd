import sqlUtils from "../utils/sql.js"; // Importar como exportación por defecto
const { sqlConnect, sql } = sqlUtils; // Desestructurar

export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .input("password", sql.VarChar, req.body.password)
            .query("SELECT * FROM users WHERE username = @username");

        if (data.recordset.length === 0) {
            return res.status(401).json({ isLogin: false, message: "Usuario no encontrado" });
        }

        const isLogin = data.recordset[0].password === req.body.password;
        res.status(200).json({ isLogin });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ isLogin: false, message: "Error del servidor" });
    }
};