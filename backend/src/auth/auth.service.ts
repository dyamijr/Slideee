import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        return user;
      }
    }
    return null;
  }

  async createUser(username: string, displayName: string, password: string) {
    const user = await this.usersService.createUser(username, displayName, password);
    return user;
  }
 
}
