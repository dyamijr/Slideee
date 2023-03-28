import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { MeService } from './me.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly meService: MeService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getCurrentUser(@Request() req) {
    const data = this.meService.getCurrentUser(req.user);
    return data;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me/groups')
  getCurrentUserGroups(@Request() req) {
    const data = this.meService.getCurrentUserGroups(req.user);
    return data;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':username')
  async findOneByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    return user;
  }
}
