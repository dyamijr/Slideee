import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  findOneByUsername(@Param('id') username: string) {
    return this.usersService.findOneByUsername(username);
  }
}
