import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user, done: (err, user) => void) {
    done(null, user._id);
  }

  async deserializeUser(id, done: (err, user) => void) {
    const user = await this.usersService.findOneById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  }
}
