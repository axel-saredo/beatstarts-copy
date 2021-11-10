import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { Track } from 'src/schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async createTrack(
    @Body() body: CreateTrackDto,
    @Param('userId') userId: string,
  ): Promise<Track> {
    return this.trackService.createTrack(userId, body);
  }

  @Put(':trackId')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async createCover(
    @Param('trackId') trackId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.trackService.createCover(trackId, file);
  }

  @Get()
  async getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }
}
