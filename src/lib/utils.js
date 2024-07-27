import mongoose from "mongoose";

// check is we have connection or not
const connection = {}

const connectToDb = async () => {
  try {
    if (connection.isConnected) {
        console.log("Using existing connection")
        return;
    }
    const db = await mongoose.connect(process.env.MONGO)
    // update connection
    connection.isConnected = db.connections[0].readyState;
  
} catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


export default connectToDb;