import mongoose, { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneById(id: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({
      username: username,
    });
    return user;
  }

  async createUser(username: string, displayName: string, password: string) {
    const user = await this.findOneByUsername(username);
    if (user) {
      throw new BadRequestException();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      username: username,
      displayName: displayName,
      password: hashPassword,
    });
    await createdUser.save();
    return createdUser;
  }

  async likeEvent(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    user.likedEvents.push(id);
    await user.save();
  }

  async unlikeEvent(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    user.likedEvents.splice(user.likedEvents.indexOf(id), 1);
    await user.save();
  }

  async findLike(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    return user.likedEvents.indexOf(id);
  }

  async slideEvent(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    user.slidEvents.push(id);
    await user.save();
  }

  async unslideEvent(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    user.slidEvents.splice(user.slidEvents.indexOf(id), 1);
    await user.save();
  }

  async findSlide(id: mongoose.Types.ObjectId, uid: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new BadRequestException(
        `User Not Found`,
      );
    }
    return user.slidEvents.indexOf(id);
  }
}
