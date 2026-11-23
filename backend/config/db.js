import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("Database not connected." + error.message);
  }
}
export default connectToDB;
