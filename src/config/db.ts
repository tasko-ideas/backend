import mongoose from "mongoose";
import { mongourl } from "./environment";

const connectToDb = async () => {
    try {
        await mongoose.connect(mongourl); 
        console.log('MongoConnected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectToDb;

