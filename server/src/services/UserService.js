import { User } from '../models/User.js';

export class UserService {
  static async createUser(data) {
    const user = await User.create(data);
    return user.toObject();
  }

  static async findByEmail(email) {
    return User.findOne({ email }).select('+password');
  }

  static async findById(id) {
    return User.findById(id);
  }

  static async findByIdWithPassword(id) {
    return User.findById(id).select('+password');
  }

  static async updateById(id, data) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteById(id) {
    return User.findByIdAndDelete(id);
  }

  static async listByRole(role) {
    return User.find({ role }).sort({ createdAt: -1 });
  }
}

