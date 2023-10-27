import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { UsersService } from 'src/users/users.service';
import { CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class EventsService {
  userService: UsersService;
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    title: string,
    description: string,
    group: mongoose.Types.ObjectId,
    admin: mongoose.Types.ObjectId,
  ) {
    const createdEvent = new this.eventModel({
      title: title,
      description: description,
      collaborators: [group],
      createdBy: admin._id,
      likes: 0,
      slides: 0,
      comments: [],
      created: Date.now(),
    });
    await createdEvent.save();

    return createdEvent._id;
  }

  async findOne(id: number) {
    const event = await this.eventModel.findById(id);
    return event;
  }

  async likeEvent(id: String, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findLike(id, uid)!=-1) { 
      throw new UnauthorizedException(
        'Already Liked',
      );
    } else {
      event.likes++;
      await event.save();
      this.userService.likeEvent(id, uid);
    }
  }

  async unlikeEvent(id: String, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findLike(id, uid)==-1) { 
      throw new UnauthorizedException(
        'Never Liked',
      );
    } else {
      event.likes--;
      await event.save();
      this.userService.unlikeEvent(id, uid);
    }
  }  

  async slideEvent(id: String, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findSlide(id, uid)!=-1) { 
      throw new UnauthorizedException(
        'Already Slid',
      );
    } else {
      event.slides++;
      await event.save();
      this.userService.slideEvent(id, uid);
    }
  }

  async unslideEvent(id: String, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findSlide(id, uid)==-1) { 
      throw new UnauthorizedException(
        'Never Slid',
      );
    } else {
      event.slides--;
      await event.save();
      this.userService.unslideEvent(id, uid);;
    }
  }  

  async commentEvent(id: String, comment: String, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    const createdComment = new this.commentModel({
      comment: comment,
      created: Date.now(),
      author: uid
    });
    await createdComment.save();
    event.comments.push(createdComment._id);
    await event.save();
  }  
 
  async findById(id: mongoose.Types.ObjectId){
    const event = await this.eventModel.findById(id);
    return event;
  }

  async addColloborator(eventId: mongoose.Types.ObjectId, colloborator: mongoose.Types.ObjectId){
    const event = await this.findById(eventId);
    event.collaborators.push(colloborator);
    await event.save();
    return event;
  }

  async isValidEvent(eventId: mongoose.Types.ObjectId){
    const event = this.findById(eventId);
    if(event){
      return true;
    }
    return false;
  }
}


