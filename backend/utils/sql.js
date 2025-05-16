import sql from 'mssql';  // Use `import` instead of `require`
import dotenv from "dotenv"
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};  

 const sqlConnect = async () => {
    try {
        console.log('Attempting to connect to SQL Server...');
        console.log('Connection details:', {
            server: sqlConfig.server,
            database: sqlConfig.database,
            user: sqlConfig.user
        });
        
        const pool = await sql.connect(sqlConfig);
        console.log('Successfully connected to SQL Server');
        return pool;
    } catch (error) {
        console.error('SQL Server connection error:', {
            message: error.message,
            code: error.code,
            state: error.state,
            class: error.class,
            server: error.server,
            procName: error.procName,
            lineNumber: error.lineNumber
        });
        throw error;
    }
};

export default { sqlConnect, sql }; // Export `sql` as a named export
