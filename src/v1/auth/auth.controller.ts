import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
