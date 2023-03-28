import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoStore = require('connect-mongo');

async function bootstrap() {
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
        mongoUrl: 'mongodb://0.0.0.0:27017',
        dbName: 'slideee',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan('tiny'));
  await app.listen(1234);
}
bootstrap();
