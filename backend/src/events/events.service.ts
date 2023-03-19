import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(title: string, description: string) {
    const createdEvent = new this.eventModel({
      title: title,
      description: description,
    });
    await createdEvent.save();
    return createdEvent;
  }

  async findOne(id: number) {
    const event = await this.eventModel.findById(id);
    return event;
  }

  async likeEvent(id: number, user: UserDocument) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException();
    }

    const userEventIndex = user.likedEvents.findIndex((x) => x == event);
    if (userEventIndex >= 0) {
      event.likes--;
      user.likedEvents.splice(userEventIndex, 1);
    } else {
      event.likes++;
      user.likedEvents.push(event);
    }

    await event.save();
    await user.save();

    return 'Success';
  }
}
