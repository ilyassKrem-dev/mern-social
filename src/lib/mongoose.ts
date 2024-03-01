import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export   const connectDB = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')

    if(isConnected) return 

    try {
        const options: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add any other options you need
        } as any;

        await mongoose.connect(process.env.MONGODB_URL,options)
        const connection = mongoose.connection;

        // Set the connection pool size
        connection.setMaxListeners(10);
        
        isConnected = true
        console.log("Connect to MongoDB")
        
    } catch (error) {
        console.log(error)
    }
}