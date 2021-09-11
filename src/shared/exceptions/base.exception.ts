import { HttpException, HttpStatus } from '@nestjs/common';

interface BaseExceptionConfig {
    statusCode: HttpStatus;
    message: string;
    errors?: Record<string, string>;
}

export function BaseException({ statusCode, message, errors }: BaseExceptionConfig) {
    return new HttpException({ statusCode, message, errors: errors ?? {} }, statusCode);
}
