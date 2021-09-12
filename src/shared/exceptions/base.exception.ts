import { HttpException, HttpStatus } from '@nestjs/common';

interface BaseExceptionConfig {
    statusCode: HttpStatus;
    message: string;
    errors?: Record<string, string>;
}

export function BaseException({ statusCode, message, errors }: BaseExceptionConfig) {
    throw new HttpException({ statusCode, message, errors }, statusCode);
}
