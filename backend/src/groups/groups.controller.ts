import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    let group = this.groupsService.createGroup(createGroupDto.groupName, createGroupDto.displayName, createGroupDto.isPrivate);
    return group;
  }

  @Get(':groupName')
  async findOneByGroupName(@Param('groupName') groupName: string) {
    let group = await this.groupsService.findOneByGroupName(groupName);
    return group;
  }

  @Post(':groupName/delete')
  async deleteGroup(@Param('groupName') groupName: string) {
    let group = await this.groupsService.deleteGroup(groupName);
    return group;
  }
  
  @Post(':groupName/edit')
  async editGroup(@Param('groupName') groupName: string, @Body() editGroupDto: EditGroupDto) {
    let group = await this.groupsService.editGroup(groupName, editGroupDto.displayName, editGroupDto.isPrivate);
    return group;
  }
}
