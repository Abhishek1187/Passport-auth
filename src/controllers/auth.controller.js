import passport from "passport";
import { mockUsers } from "../mockUsers.js";


export const signUp = ( req , res) => {

  const { username, password, displayName } = req.body;

  try {
    if(!username || !password || !displayName) {
      return res.status(400).json({message: "Username, password, and displayName are required"})
    }

    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"})
    }

    const existingUser = mockUsers.find((user) => user.name === username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // In a real app, you would HASH the password before saving
    const newUser = {
      id: mockUsers.length + 1,
      name: username,
      password: password,
      displayName: displayName,
      age: 0, // default value
    };
    mockUsers.push(newUser);

    // Automatically log in the user after they sign up
    req.logIn(newUser, (err) => {
      if (err) return res.status(500).json({ message: "Signup successful, but auto-login failed." });
      return res.status(201).json({ message: "User signed up and logged in successfully", user: newUser });
    });

  } catch (error) {
    console.log("error in signup controller",error)
    res.status(500).json({message: "Internal server error"})
    
  }

}

export const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (!user) return res.status(401).json({ message: info?.message || "Authentication failed" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};