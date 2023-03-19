import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  likes: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
