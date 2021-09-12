import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../shared/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    findAll() {
        return this.userRepository.findAll();
    }

    create(dto: CreateUserDto) {
        return this.userRepository.createUser(dto);
    }
}
