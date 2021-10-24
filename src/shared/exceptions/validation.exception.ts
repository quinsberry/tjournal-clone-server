import { HttpException, HttpStatus } from '@nestjs/common';
import { SerializerService } from '../services/serializer.service';

export class ValidationException extends HttpException {
    messages;

    constructor(response) {
        super(SerializerService.error(HttpStatus.BAD_REQUEST, 'Validation error', response), HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}
