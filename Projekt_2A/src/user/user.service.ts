import { Injectable } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interfaces/user';
import { hashPwd } from 'src/utils/hash-pwd';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { Command, Console } from 'nestjs-console';

@Injectable()
@Console({
  // @ts-ignore
  name: 'users',
})
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);
    await user.save();

    return user;
  }

  async getOneUser(userId: string): Promise<User> {
    return await User.findOne(userId);
  }

  @Command({
    command: 'list',
    description: 'List all of the users',
  })
  async listUsersCmd() {
    console.log((await User.find()).map(this.filter));
  }

  @Command({
    command: 'add <email> <pwd>',
    description: 'Add new user',
  })
  async addUsersCmd(email: string, pwd: string) {
    console.log(
      await this.register({
        email,
        pwd,
      }),
    );
  }
}
