import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(body);
  }
}
