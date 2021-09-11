import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('signup')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }
}
