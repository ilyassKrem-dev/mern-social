import mongoose from "mongoose";

let isConnected = false;

export   const connectDB = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')

    if(isConnected) return 

    try {
        

        await mongoose.connect(process.env.MONGODB_URL)
        const connection = mongoose.connection;

        // Set the connection pool size
        connection.setMaxListeners(10);
        
        isConnected = true
        console.log("Connect to MongoDB")
        
    } catch (error) {
        console.log(error)
    }
}