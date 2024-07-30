import mongoose from "mongoose";

// check is we have connection or not
const connection = {}

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongo DB");
  
} catch (error) {
    console.log("Error connecting to mongoDB:",error);
    throw new Error(error);
  }
}


export default connectToDb;