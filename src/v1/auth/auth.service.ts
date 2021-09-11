import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }
    async register(dto: CreateUserDto) {
        try {
            const user = await this.userService.create(dto);
            return {
                ...user,
                // token: this.generateJwtToken(user),
            };
        } catch (err) {
            throw new ForbiddenException('Registration error');
        }
    }
}
