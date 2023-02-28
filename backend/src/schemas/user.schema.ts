import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Event } from './event.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  displayName: string;

  @Prop()
  password: string;

  @Prop({ 
    type: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event' 
    }]
  })
  likedEvents: Event[];
}

export const UserSchema = SchemaFactory.createForClass(User);