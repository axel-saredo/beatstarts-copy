import { Injectable } from '@nestjs/common';
import { File } from 'src/schemas/file.schema';
import { extname } from 'path';

@Injectable()
export class FileMapperService {
  fromMulterToModel(file: Express.Multer.File): Partial<File> {
    const { originalname, mimetype, destination } = file;
    return {
      name: originalname,
      extension: extname(originalname),
      path: destination,
      contentType: mimetype,
    };
  }
}
