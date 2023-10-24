import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
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
      created: Date.now(),
    });
    await createdEvent.save();

    return createdEvent._id;
  }

  async findOne(id: number) {
    const event = await this.eventModel.findById(id);
    return event;
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
