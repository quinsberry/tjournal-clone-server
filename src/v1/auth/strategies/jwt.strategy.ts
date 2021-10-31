import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ConfigService } from '../../../shared/services/config.service';

export interface JwtData {
    sub: number;
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ConfigService.getEnv('SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtData) {
        const data = { id: payload.sub, email: payload.email };

        const user = await this.userService.findByProps(data);

        if (!user) {
            throw new UnauthorizedException('Access denied.');
        }
        delete user.password;

        return user;
    }
}
