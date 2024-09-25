import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response as ExpressResponse } from 'express';
import { DateTime } from 'luxon';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<Request>();

    // HTTP 예외의 상태 코드와 메시지를 가져옴
    const status = exception.getStatus();
    const message = exception.message;

    // 타임존 설정 및 타임스탬프 생성
    const timeZone = process.env.TZ || 'Asia/Seoul';
    const timestamp = DateTime.now().setZone(timeZone).toISO();

    // 클라이언트에게 JSON 형식으로 응답을 보냄
    response.status(status).json({
      statusCode: status,
      timestamp: timestamp,
      path: request.url,
      message,
    });

    // 콘솔에 에러 로그 출력
    console.log('==========================');
    console.log('예외가 발생하였습니다.', timestamp);
    console.log('예외 내용: ', message);
    console.log('예외 코드: ', status);
    console.log('==========================');
  }
}
