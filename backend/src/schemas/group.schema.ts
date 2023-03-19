import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop()
  groupName: string;

  @Prop()
  displayName: string;

  @Prop()
  isPrivate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  admins: mongoose.Types.ObjectId[];
}

const GroupSchema = SchemaFactory.createForClass(Group);

export { GroupSchema };
