import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { AppDataSource } from "../data-source";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      return token;
    }

    return null;
  }
}

export default new UserService();
