import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;

export enum InviteType {
  FollowRequest = 'FollowRequest', // this is a user to group invitation
  AdminRequest = 'AdminRequest', // this is a  group to user invitation
}
@Schema()
export class Invite {
  @Prop({ type: String, enum: InviteType })
  type: string;

  @Prop()
  sender: mongoose.Types.ObjectId;

  @Prop()
  recipient: mongoose.Types.ObjectId;

  @Prop({ default: false })
  accepted: boolean;

  @Prop()
  created: Date;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
