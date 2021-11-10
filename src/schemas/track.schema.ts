import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { File } from './file.schema';

export type TrackDocument = Track & mongoose.Document;

@Schema()
export class Track {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  coverId: File;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  fileId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
