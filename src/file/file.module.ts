import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File } from '../schemas/file.schema';
import { UserSchema } from '../schemas/user.schema';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: UserSchema }]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
