import { HttpStatus } from '@nestjs/common';

export interface SerializedResponse<Data = any> {
    statusCode: HttpStatus;
    data: Data;
}
export interface SerializedFailedResponse<Errors = any> {
    statusCode: HttpStatus;
    message: string;
    errors: Errors;
}

export class SerializerService {
    public static response<Data extends any>(
        data: Data,
        statusCode: HttpStatus = HttpStatus.OK,
    ): SerializedResponse<Data> {
        return {
            statusCode,
            data,
        };
    }

    public static error<Errors extends any>(statusCode, message, errors): SerializedFailedResponse<Errors> {
        return {
            statusCode,
            message,
            errors,
        };
    }
}
