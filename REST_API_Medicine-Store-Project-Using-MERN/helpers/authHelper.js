//import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
export const hashPassword = async (password) => {
//   How Password Hashing Works:
// Salting:
// A random string (called a salt) is added to the password before hashing. This ensures that even if two users have the same password, their hashes will be different.

// Hashing:
// The salted password is passed through a hashing algorithm (like bcrypt) which converts it into a fixed-length string that can't be reversed to get the original password.

// Storing:
// The resulting hashed password (including the salt) is stored in the database.
  try {
    const saltRounds = 10; // Defines the complexity of the hashing process
    const hashedPassword = await bcrypt.hash(password, saltRounds); //// Hashing the password with the defined salt rounds
    return hashedPassword;
  } catch (error) {
    console.log(error);// Logging any errors that occur during hashing
  }
};

// Function to compare plain text password with hashed password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); // Compares the plain password with the hashed one, returns true if they match
};