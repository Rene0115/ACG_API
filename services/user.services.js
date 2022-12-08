/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import userModel from '../models/user.model.js';

class UserService {
  async create(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async findByEmail(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }
}
export default new UserService();
