import sql from 'mssql';  // Use `import` instead of `require`

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};  

export const sqlConnect = async () => {
    return await sql.connect(sqlConfig);
};

export default { sqlConnect, sql }; // Export `sql` as a named export
