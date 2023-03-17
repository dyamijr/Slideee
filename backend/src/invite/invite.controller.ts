import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly usersService: InviteService) {}

 
}
