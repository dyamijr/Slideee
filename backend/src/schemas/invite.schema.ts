import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;

@Schema()
export class Invite {
  @Prop()
  type: string;

  
  @Prop()
  sender: Schema.Types.ObjectId;

  @Prop()
  recepient: Schema.Types.ObjectId;

  @Prop()
  accepted: boolean;

  @Prop()
  created: Date;

  @Prop()
  expires:Date;

}

export const InviteSchema = SchemaFactory.createForClass(Invite);