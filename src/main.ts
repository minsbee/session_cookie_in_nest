import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  const Address = 'localhost:4000';

  // 전역 설정
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS 설정
  app.enableCors({
    origin: [Address],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // 세션 설정
  const sessionMiddleware = session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24시간
      httpOnly: true,
      secure: false,
    },
  });
  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  // Swagger 설정
  const swaggerOptions = new DocumentBuilder()
    .setTitle('session_cookie API')
    .setDescription('session_cookie API Description')
    .setVersion('3.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    });

  // 환경에 따라 Swagger 서버 추가
  if (process.env.NODE_ENV === 'production') {
    swaggerOptions.addServer(Address, 'session_cookie Deployed Server');
  } else {
    swaggerOptions.addServer(Address, 'session_cookie Dev Server');
  }

  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
};

bootstrap();
