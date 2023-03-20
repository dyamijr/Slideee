import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
let MongoStore = require('connect-mongo')

async function bootstrap() {
  console.log(MongoStore);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/slideee',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(1234);
}
bootstrap();
