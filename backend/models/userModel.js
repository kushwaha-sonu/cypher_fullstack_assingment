import mongoose, { Schema } from "mongoose";

const userModel =new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    display_name:{
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,

    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userModel);
export default User;
