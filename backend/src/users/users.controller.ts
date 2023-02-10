import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOneByUsername(@Param('username') username: string) {
    let user = await this.usersService.findOneByUsername(username);
    return user;
  }
}
