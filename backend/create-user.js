import { generateSalt, hashPassword } from './utils/password.js';
import sqlUtils from './utils/sql.js';

const { sqlConnect, sql } = sqlUtils;

async function createUser(username, password) {
    try {
        // Generate salt and hash password
        const salt = generateSalt();
        const hashedPassword = hashPassword(password, salt);

        // Connect to database
        const pool = await sqlConnect();

        // Check if user already exists
        const checkUser = await pool
            .request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM users WHERE username = @username');

        if (checkUser.recordset.length > 0) {
            console.log('User already exists. Updating password...');
            // Update existing user's password
            await pool
                .request()
                .input('username', sql.VarChar, username)
                .input('password', sql.VarChar, hashedPassword)
                .input('salt', sql.VarChar, salt)
                .query('UPDATE users SET password = @password, salt = @salt WHERE username = @username');
        } else {
            console.log('Creating new user...');
            // Create new user
            await pool
                .request()
                .input('username', sql.VarChar, username)
                .input('password', sql.VarChar, hashedPassword)
                .input('salt', sql.VarChar, salt)
                .query('INSERT INTO users (username, password, salt) VALUES (@username, @password, @salt)');
        }

        console.log('User created/updated successfully!');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Salt:', salt);
        console.log('Hashed Password:', hashedPassword);

    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Get username and password from command line arguments
const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    console.log('Please provide username and password as arguments:');
    console.log('node create-user.js <username> <password>');
    process.exit(1);
}

createUser(username, password); 