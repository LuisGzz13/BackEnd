import crypto from 'crypto';

// Generate a random salt
const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Hash a password with a salt
const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
};

// Verify a password against a hash
const verifyPassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};

export { generateSalt, hashPassword, verifyPassword }; 