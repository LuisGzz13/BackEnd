import { generateSalt, hashPassword } from './utils/password.js';
import User from './utils/user.model.js';
import { connectDB } from './utils/mongodb.js';
import dotenv from 'dotenv';
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
async function createUser(username, password) {
    try {
        await connectDB();
        // Generate salt and hash password
        const salt = generateSalt();
        const hashedPassword = hashPassword(password, salt);

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            console.log('User already exists. Updating password...');
            user.password = hashedPassword;
            user.salt = salt;
            await user.save();
        } else {
            console.log('Creating new user...');
            user = new User({ username, password: hashedPassword, salt });
            await user.save();
        }

        console.log('User created/updated successfully!');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Salt:', salt);
        console.log('Hashed Password:', hashedPassword);

        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
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