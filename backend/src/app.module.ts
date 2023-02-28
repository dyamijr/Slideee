import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://db:27017/slideee'), AuthModule, EventsModule],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
