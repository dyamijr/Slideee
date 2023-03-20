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
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthGuard } from './login.guard';
import { SignupAuthGuard } from './signup.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('Here');
    return req.user;
  }

  @UseGuards(SignupAuthGuard)
  @Post('signup')
  async signup(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('test')
  async test(@Request() req) {
    return req.user;
  }
}
