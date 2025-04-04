import sqlUtils from "../utils/sql.js";

const { sqlConnect, sql } = sqlUtils;

export const getIndex = (req, res) => { res.send('Hello World from API'); }
export const getPing  = (req, res) => { res.send('pong'); }

export const testDB = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const result = await pool.request().query('SELECT 1 as test');
        
        if (result.recordset.length > 0) {
            res.status(200).json({
                success: true,
                message: "Successfully connected to SQL Server",
                data: result.recordset[0]
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Connected but no data returned"
            });
        }
    } catch (error) {
        console.error("SQL Server connection error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to connect to SQL Server",
            error: error.message
        });
    }
};

