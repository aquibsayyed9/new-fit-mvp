import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/userModel";
import UserService from "../services/userService";
import { AppDataSource } from "../data-source"; // Import your initialized DataSource

class UserController {
  // Register a new user
  async registerUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, country } = req.body;

    try {
      // Use AppDataSource to get the repository
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.country = country;

      const savedUser = await UserService.createUser(newUser);

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: savedUser.id,
          email: savedUser.email,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          country: savedUser.country,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  // User login
  async loginUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const token = await UserService.validateUser(email, password);
      if (token) {
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

export default new UserController();
