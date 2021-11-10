import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    console.log(createUserDto);
    const newUser = new this.userModel(createUserDto);
    await newUser.save().catch(() => {
      throw new HttpException(
        'Email or username already exists',
        HttpStatus.CONFLICT,
      );
    });

    return omit(newUser.toJSON(), 'password');
  }

  async findOne(query: FilterQuery<UserDocument>): Promise<User | undefined> {
    return this.userModel.findOne(query);
  }
}
