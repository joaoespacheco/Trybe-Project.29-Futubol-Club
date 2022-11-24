import AuthTools from '../Utils/AuthTools';
import IUserService from '../interfaces/IUserService';
import HttpException from '../Utils/HttpException';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

class UserService implements IUserService {
  constructor(
    private _userModel = User,
    private _authTools = new AuthTools(),
  ) {}

  public login = async (login: ILogin): Promise<string> => {
    const user = await this._userModel.findOne({ where: { email: login.email } });
    if (!user) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const token = this._authTools.generateToken({ id: user.id, role: user.role });

    return token;
  };
}

export default UserService;