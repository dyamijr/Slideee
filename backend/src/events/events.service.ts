import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { UserDocument } from '../schemas/user.schema';
import { GroupDocument } from 'src/schemas/group.schema';
import { GroupsService } from 'src/groups/groups.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private groupsService: GroupsService
  ) {}

  async create(title: string, description: string, collaboratorsGroupNames: string[], admin: UserDocument) {
    let collaboratorsGroupDocuments: GroupDocument[];
    for (let collaboratorGroupName of collaboratorsGroupNames) {
      let group = await this.groupsService.findOneByGroupName(collaboratorGroupName);
      if (!group) {
        throw new BadRequestException(`Group Not Found: ${collaboratorGroupName}`);
      }
      collaboratorsGroupDocuments.push(group);
    }
    
    let isUserGroupAdmin = collaboratorsGroupDocuments[0].admins.find((x) => x.equals(admin._id));
    if (!isUserGroupAdmin) {
      throw new UnauthorizedException();
    }

    const createdEvent = new this.eventModel({
      title: title,
      description: description,
      collaborators: [collaboratorsGroupDocuments[0]._id],
      createdBy: admin._id,
      created: Date.now()
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
