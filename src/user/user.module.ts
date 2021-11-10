import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            const user = this as UserDocument;
            if (!user.isModified('password')) {
              return next();
            }

            const rounds = configService.get<number>('SALT_WORK_FACTOR');
            const salt = await bcrypt.genSalt(Number(rounds));

            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;

            return next();
          });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
