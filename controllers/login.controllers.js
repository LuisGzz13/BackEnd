import {sqlConnect, sql} from "../utils/sql.js";


export const login = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, req.body.password)
        .query("select * from users where username=@username");
    console.log(data.recordset);
    
    let isLogin = data.recordset[0].password === req.body.password;

    res.status(200).json({ isLogin: isLogin });
};