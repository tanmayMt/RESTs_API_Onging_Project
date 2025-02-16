// Importing the user model and password hashing helper
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

// Controller for user registration
export const registerController = async (req, res) => {
  try {
    // Extracting user details from the request body
    const { name, email, password, phone, address, answer } = req.body;

    // Validations to ensure all fields are provided
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    // Checking if the user already exists in the database
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, please login",
      });
    }

    // Hashing the user's password for security
    const hashedPassword = await hashPassword(password);

    // Creating and saving the new user in the database
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword, // Storing the hashed password
      // Itis responsible for storing the hashed password in the database instead of the plain text password. This enhances security because even if the 
      // database is compromised,the actual passwords remain protected.
      answer,
    }).save();

    // Sending success response upon successful registration
    res.status(201).send({
      success: true,
      message: "User is Registered Successfully",
      user: user
    });

  } catch (error) {
    // Handling errors during registration
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration Failed",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try{
    const { email, password } = req.body;
    console.log(password);
    //Validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:"Invalid Email or Passsword"
      })
    }
    //Cheack User
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email is not Registerd!!"
      })
    }
    //Cheack Password Validation
    const match = await comparePassword(password,user.password);
    if(!match){
      return res.status(202).send({
        success:false,
        message:"Invalid Passsword"
      })
    }

    return res.status(201).send({
      success:true,
      message:"Login Successfully"
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Login Failed",
      error,
    });
  }
};
