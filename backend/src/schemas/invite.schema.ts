import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;

export enum InviteType {
  FollowRequest = 'FollowRequest',
  AdminRequest = 'AdminRequest',
  CollaboratorRequest = 'CollaboratorRequest',
}

@Schema()
export class Invite {
  @Prop({ type: String, enum: InviteType })
  type: string;

  @Prop()
  sender: mongoose.Types.ObjectId;

  @Prop()
  recipient: mongoose.Types.ObjectId;

  @Prop()
  content: mongoose.Types.ObjectId;

  @Prop({ default: false })
  accepted: boolean;

  @Prop()
  created: Date;

  @Prop()
  senderName:string;
  
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
