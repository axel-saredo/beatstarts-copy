import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { File } from './file.schema';
import { User } from './user.schema';

export type TrackDocument = Track & mongoose.Document;

@Schema()
export class Track {
  @Prop({ required: true })
  title: string;

  @Prop()
  cover: File;

  @Prop({ required: true, unique: true })
  file: File;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  fileId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
