import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  likes: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  collaborators: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  createdBy: mongoose.Types.ObjectId[];

  created: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
