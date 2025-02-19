// //Now using this token we can Protected our Routes
import JWT from "jsonwebtoken";

//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
    try {
        // Extract the JWT token from the 'Authorization' header
        const decode = JWT.verify( //JWT token   https://chatgpt.com/share/67b1cc63-d8c0-8001-bd16-99e4ab958eb4
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        
        next();// If verification is successful, move to the next middleware or route handler
    } catch (error) {
        console.log(error);
        // Log any errors that occur during token verification
    }
}