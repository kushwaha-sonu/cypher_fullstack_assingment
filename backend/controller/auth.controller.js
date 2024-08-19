import { generateJwtToken } from "../utils/generateJwt.js";
import User from "../models/userModel.js";
import hashPassword from "../utils/hashPassword.js";
import verifyHashedPassword from "../utils/verifyHashedPassword.js";

export const registerUser = async (req, res) => {
  try {
    const user = req.body;

    let errorMessage = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    const display_name_regex = /^[a-zA-Z0-9]+$/;

    switch (true) {
      case user.name === "" || user.name === undefined:
        errorMessage = "Name is required";
        break;
      case user.name.length < 3 || user.name.length > 10:
        errorMessage = "Name should be between 3 and 10 characters long";
        break;
      case user.display_name === "" || user.display_name === undefined:
        errorMessage = "Display name is required";
        break;

      case !display_name_regex.test(user.display_name):
        errorMessage =
          "Invalid user name format. Only letters and numbers are allowed";
        break;
      case user.display_name.length < 3 && user.display_name.length > 10:
        errorMessage = "User name should be between 3 and 10 characters long";
        break;
      case !nameRegex.test(user.name):
        errorMessage =
          "Invalid name format. Only letters and spaces are allowed";
        break;
      case user.email === "" || user.email === undefined:
        errorMessage = "Email is required";
        break;
      case !emailRegex.test(user.email):
        errorMessage = "Invalid email format";
        break;
      case user.password === "" || user.password === undefined:
        errorMessage = "Password is required";
        break;
      case !user.password || user.password.length < 4:
        errorMessage = "Password should be atleast 4 characters long";
        break;
    }

    if (errorMessage) {
      return res.status(400).send({
        message: errorMessage,
      });
    }

    const userDb = await User.findOne({ email: user.email });

    if (userDb) {
      return res.status(400).send({
        message: "User Already Exists",
      });
    }

    const userName = await User.findOne({ display_name: user.display_name });

    if (userName) {
      return res.status(400).send({
        message: "Display User Name Already Taken",
      });
    }

    const hashed_password = await hashPassword(user.password);

    const newUser = new User({
      full_name: user.name,
      display_name: user.display_name,
      email: user.email,
      password: hashed_password,
    });
    await newUser.save();

    const access_token =await generateJwtToken(user, req, res);

    res
      .status(201)
      .cookie("access_token", access_token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      })
      .json({
        message: "Registration successful",
        user: newUser,
        // user: {
        //   full_name: newUser.full_name,
        //   email: newUser.email,
        // },
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    let errorMessage = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (true) {
      case email === undefined || email === "":
        errorMessage = "Email is required";
        break;
      case !emailRegex.test(email):
        errorMessage = "Invalid email format";
        break;
      case password === undefined || password === "":
        errorMessage = "Password is required";
        break;
    }

    if (errorMessage) {
      return res.status(400).send({
        message: errorMessage,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
      });
    }

    const access_token =await generateJwtToken(user, req, res);

    // console.log("Login Token:", access_token);

    const isPasswordValid = await verifyHashedPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    res
      .status(200)
      .cookie("access_token", access_token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      })
      .json({
        message: "Login successful",
        user: {
          _id: user._id,
          full_name: user.full_name,
          photoUrl:user.photoUrl,
          email: user.email,
          display_name: user.display_name,
        },
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
      const {email, old_password, new_password} = req.body;
      // console.log("Update Password:", old_password, new_password);

      let errorMessage = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      switch (true) {
          case email === null || email === "":
              errorMessage = "Email is required";
              break;
          case !emailRegex.test(email):
              errorMessage = "Invalid email format";
              break;
          case old_password === "":
              errorMessage = "Old password is required";
              break;
          case new_password === "":
              errorMessage = "New password is required";
              break;
          case !new_password || new_password.length < 4:
              errorMessage = "Password should be atleast 4 characters long";
              break;
          case old_password === new_password:
              errorMessage = "New password should be different from old password";
              break;

      }

      if (errorMessage) {
          return res.status(400).send({
              message: errorMessage,
          });
      }

      const user = await User.findOne({email});
      // console.log("User:", user);

      if (!user) {
          return res.status(400).send({
              message: "User does not exist",
          });
      }

      const isPasswordValid = await verifyHashedPassword(old_password, user.password);

      if (!isPasswordValid) {
          return res.status(400).send({
              message: "Invalid password",
          });
      }

      const hashed_password = await hashPassword(new_password);

      const updatedUser = await User.findOneAndUpdate(
          {email},
          {
              $set: {
                  password: hashed_password,
              },
          },
          {
              new: true,
          }
      );

      // console.log("Updated User:", updatedUser);

      res.status(200).json({
          message: "Password updated successfully",
          success: true,
      });
  } catch (error) {
      console.log("Error updating password:", error.message);
      res.status(500).json({
          message: "Something went wrong",
          success: false,
          error: error.message,
      });
  }
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};
