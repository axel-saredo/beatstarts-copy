import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | boolean> {
    const user = (await this.userService.findOne({ username })) as UserDocument;
    if (!user) return false;

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) return false;

    return omit(user.toJSON(), 'password');
  }

  async createSession(user: LoginUserDto) {
    const foundUser = (await this.userService.findOne({
      username: user.username,
    })) as UserDocument;

    const payload = { username: user.username, sub: foundUser._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
    };
  }
}
