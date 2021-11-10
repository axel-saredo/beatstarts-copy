import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
  ) {}

  async createFile(fileData: File): Promise<FileDocument> {
    const newFile = new this.fileModel(fileData);
    console.log(newFile);
    return newFile.save();
  }
}
