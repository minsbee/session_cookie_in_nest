import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisService } from './commons/redis/redis.service';
import RedisStore from 'connect-redis';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  const Address = process.env.ADDRESS ?? 'http://localhost:4000';

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

  // redis 설정
  const redisService = app.get(RedisService);
  const redisClient = redisService.getClient();

  // 세션 설정 (중복 제거)
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET!, // .env 파일에서 가져옴
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24시간
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 배포 환경에서만 secure 설정
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // redis 세션 저장 확인용 로깅 (선택 사항)
  redisClient.on('connect', () => {
    console.log('Redis 접속 완료');
  });

  redisClient.on('ready', () => {
    console.log('Redis is ready to store sessions');
  });

  // Swagger 설정
  const swaggerOptions = new DocumentBuilder()
    .setTitle('session_cookie API')
    .setDescription('session_cookie API Description')
    .setVersion('3.0');

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
