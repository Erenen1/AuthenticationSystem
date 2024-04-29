import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("baglanti basarili")
    } catch (error) {
        console.log(error);
    }
} 
