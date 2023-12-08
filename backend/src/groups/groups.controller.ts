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
import { UserDto } from './dto/user.dto';
import * as mongoose from 'mongoose';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from 'src/users/entities/user.entity';


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
      req.user._id,
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
  @Get(':groupName/followers')
  async getFollowers(@Param('groupName') groupName: string){
    const followers = await this.groupsService.getFollowers(groupName);
    return followers;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':groupName/Admins')
  async getAdmins(@Param('groupName') groupName: string){
    const admins = await this.groupsService.getAdmins(groupName);
    return admins;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/delete')
  async deleteGroup(@Param('groupName') groupName: string, @Request() req) {
    const group = await this.groupsService.deleteGroup(groupName, req.user._id);
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
      req.user._id,
    );
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/unfollow')
  async unfollowGroup(@Param('groupName') groupName: string, @Request() req) {
    let group = await this.groupsService.unfollowGroup(groupName, req.user._id);
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/removeAdmin')
  async removeFollower(@Param('groupName') groupName: string, @Body() userDto: UserDto, @Request() req) {
    let group = await this.groupsService.removeFollower(groupName, new mongoose.Types.ObjectId(userDto.user), req.user._id);
    return group;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/removeAdmin')
  async removeAdmin(@Param('groupName') groupName: string, @Body() userDto: UserDto, @Request() req) {
    let group = await this.groupsService.removeAdmin(groupName, new mongoose.Types.ObjectId(userDto.user), req.user._id);
    return group;
  }
}
