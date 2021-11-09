import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FileDocument = File & mongoose.Document;

@Schema({
  timestamps: true,
})
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  contentType: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
