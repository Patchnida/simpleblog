import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name:{
      type: String,
      required: false
    },
    surname:{
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone:{
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
      default: "/noavatar.png",
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
