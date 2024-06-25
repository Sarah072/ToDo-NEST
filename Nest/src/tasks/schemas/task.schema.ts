import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  completed: boolean;

  @Prop()
  completedTime: Date;

  @Prop({ default: Date.now })
  creationTime: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
