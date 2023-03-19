import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/slideee'),
    AuthModule,
    GroupsModule,
    EventsModule,
  ],
  controllers: [AppController, UsersController, EventsController],
  providers: [AppService],
})
export class AppModule {}
