import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class MeService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getCurrentUser(me: UserDocument) {
    console.log(me);
    return {
      username: me.username,
      displayName: me.displayName,
    };
  }
}
