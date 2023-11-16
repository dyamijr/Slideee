import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { UsersService } from 'src/users/users.service';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class EventsService {
  
  constructor(
    private userService: UsersService,
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

  async likeEvent(id: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findLike(event._id, uid)!=-1) { 
      throw new UnauthorizedException(
        'Already Liked',
      );
    } else {
      event.likes++;
      await event.save();
      this.userService.likeEvent(event._id, uid);
      return event;
    }
  }

  async unlikeEvent(id: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findLike(event._id, uid)==-1) { 
      throw new UnauthorizedException(
        'Never Liked',
      );
    } else {
      event.likes--;
      await event.save();
      this.userService.unlikeEvent(event._id, uid);
      return event;
    }
  }  

  async slideEvent(id: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findSlide(event._id, uid)!=-1) { 
      throw new UnauthorizedException(
        'Already Slid',
      );
    } else {
      event.slides++;
      await event.save();
      this.userService.slideEvent(event._id, uid);
      return event;
    }
  }

  async unslideEvent(id: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    if (await this.userService.findSlide(event._id, uid)==-1) { 
      throw new UnauthorizedException(
        'Never Slid',
      );
    } else {
      event.slides--;
      await event.save();
      this.userService.unslideEvent(event._id, uid);
      return event;
    }
  }  

  async commentEvent(id: string, comment: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    const createdComment = new this.commentModel({
      content: comment,
      created: Date.now(),
      author: uid
    });
    await createdComment.save();
    event.comments.push(createdComment._id);
    await event.save();
    return createdComment;
  } 
  
  async editComment(id: string, cid: string, comment: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    const oldComment = await this.commentModel.findById(cid);
    if (!oldComment) {
      throw new BadRequestException(
        `Comment Not Found`,
      );
    }
    if (oldComment.author.equals(uid)) {
      oldComment.content = comment;
      await oldComment.save();
      await event.save();
      return oldComment;
    } else {
      throw new BadRequestException(
        `Cannot edit comment: Not the author of this comment`,
      );
    }
  }

  async deleteComment(id: string, cid: string, uid: mongoose.Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(
        `Event Not Found`,
      );
    }
    const oldComment = await this.commentModel.findById(cid);
    if (!oldComment) {
      throw new BadRequestException(
        `Comment Not Found`,
      );
    }
    if (!oldComment.author.equals(uid)) {
      throw new BadRequestException(
        `Cannot delete comment: Not the author of this comment`,
      );
    } else {
      await oldComment.delete();
      event.comments.splice(event.comments.indexOf(oldComment._id), 1);
      await event.save();
    }
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
  async getEvents(groupId: string){
    const events = this.eventModel.find({collaborators: groupId});
    return events;
  }
  async isValidEvent(eventId: mongoose.Types.ObjectId){
    const event = this.findById(eventId);
    if(event){
      return true;
    }
    return false;
  }
}


