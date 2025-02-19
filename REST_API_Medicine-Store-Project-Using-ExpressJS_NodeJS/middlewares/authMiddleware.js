//JWT authentication middleware
// //Now using this token we can Protected our Routes
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
    try {
        // Extract the JWT token from the 'Authorization' header
        const decode = JWT.verify( //JWT token   https://chatgpt.com/share/67b1cc63-d8c0-8001-bd16-99e4ab958eb4
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();// If verification is successful, move to the next middleware or route handler
    } catch (error) {
        console.log(error);
        // Log any errors that occur during token verification
    }
}

//admin acceess   Protect Admin Route
// Middleware to check if the current user is an admin
export const isAdmin = async (req, res, next) => {
    try {
         // Retrieve the user from the database using the user ID stored in req.user
        const user = await userModel.findById(req.user._id);

        // Check if the user's role is not admin (assuming role 1 represents admin)
        if(user.role !== 1){
            // If not admin, send a 401 Unauthorized response with a message
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }
        else{
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send({// Send a 401 Unauthorized response with the error details
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
}