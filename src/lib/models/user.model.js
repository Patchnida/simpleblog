import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
      },
      password: {
        type: String,
      },
      img: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  export const User = mongoose.models?.User || mongoose.model("User", userSchema);