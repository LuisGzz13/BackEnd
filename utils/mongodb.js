import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            ssl: true,
            tls: true,
            tlsAllowInvalidCertificates: true,
            retryWrites: true,
            w: "majority"
        });
        console.log("MongoDB Connected!");    
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};