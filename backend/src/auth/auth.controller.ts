import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthGuard } from './login.guard';
import { SignupAuthGuard } from './signup.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(@Request() req) {
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
