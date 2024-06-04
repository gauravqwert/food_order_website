import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gaurav:gaurav282000@cluster0.gfijqlj.mongodb.net/food_del').then(() => console.log("DB connected"));
}