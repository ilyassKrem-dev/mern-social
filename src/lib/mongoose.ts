import mongoose from "mongoose";

let isConnected = false;

export   const connectDB = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')

    if(isConnected) return 

    try {
 
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log("Connect to MongoDB")
        
    } catch (error) {
        console.log(error)
    }
}