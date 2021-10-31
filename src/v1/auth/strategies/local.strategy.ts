import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        const user = await this.userService.findByProps({ email });
        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            throw new UnauthorizedException('User or password are not valid');
        }
        delete user.password;

        return user;
    }
}
