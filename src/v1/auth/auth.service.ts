import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../shared/entities/user.entity';
import { ConfigService } from '../../shared/services/config.service';
import { JwtData } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async register(dto: CreateUserDto) {
        const user = await this.userService.create(dto);
        try {
            return {
                ...user,
                token: this.generateJwtToken(user),
            };
        } catch (err) {
            throw new ForbiddenException('Registration error');
        }
    }

    generateJwtToken(data: { id: number; email: string }) {
        const payload: JwtData = { email: data.email, sub: data.id };
        return this.jwtService.sign(payload, { secret: ConfigService.getEnv('SECRET') });
    }

    async login(user: User) {
        return {
            ...user,
            token: this.generateJwtToken(user),
        };
    }
}
