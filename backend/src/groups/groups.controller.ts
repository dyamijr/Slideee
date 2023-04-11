import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from '../schemas/user.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    const group = this.groupsService.createGroup(
      createGroupDto.groupName,
      createGroupDto.displayName,
      createGroupDto.isPrivate,
      req.user,
    );
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  async queryGroups(@Query('groupName') groupNameQuery = '') {
    const groups = await this.groupsService.queryGroups(groupNameQuery);
    return groups;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':groupName')
  async findOneByGroupName(@Param('groupName') groupName: string) {
    const group = await this.groupsService.findOneByGroupName(groupName);
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id/getgroupInvites')
  async getGroupInvites(@Param('id') groupName: string) {
    const group = await this.groupsService.findOneByGroupName(groupName);
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/delete')
  async deleteGroup(@Param('groupName') groupName: string, @Request() req) {
    const group = await this.groupsService.deleteGroup(groupName, req.user);
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/edit')
  async editGroup(
    @Param('groupName') groupName: string,
    @Body() editGroupDto: EditGroupDto,
    @Request() req,
  ) {
    const group = await this.groupsService.editGroup(
      groupName,
      editGroupDto.displayName,
      editGroupDto.isPrivate,
      req.user,
    );
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':groupId/eventCollaborationRequests')
  async getEventCollaborationRequests(
    @Param('groupId') groupId: string,
    @Request() req,
  ) {
    console.log(groupId, req.user);
    const invites = await this.groupsService.getEventCollaborationRequests(
      groupId,
      req.user,
    );
     return invites;
  }
  
}
