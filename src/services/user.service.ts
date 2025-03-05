import { IUser, IUserService } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";

export class UserService implements IUserService {
  async createUser(user: IUser): Promise<IUser> {
    console.log("Register controller hit");
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      ...user,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }
}
