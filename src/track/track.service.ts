import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { File } from 'src/schemas/file.schema';
import { Track, TrackDocument } from 'src/schemas/track.schema';
import { FileMapperService } from 'src/utils/fileMapper.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly fileService: FileService,
    private readonly fileMapperService: FileMapperService,
    @InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>,
  ) {}

  async createTrack(
    userId: string,
    createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    const newTrack = new this.trackModel(createTrackDto);
    newTrack.user = userId;
    return newTrack.save();
  }

  async createCover(trackId: string, file: Express.Multer.File): Promise<void> {
    const fileData = this.fileMapperService.fromMulterToModel(file) as File;
    fileData.type = 'track-cover';
    const fileModel = await this.fileService.createFile(fileData);
    await this.trackModel.updateOne(
      { _id: trackId },
      { $set: { coverId: fileModel._id } },
    );
  }

  async getTracks(): Promise<Track[]> {
    return this.trackModel.find();
  }
}
