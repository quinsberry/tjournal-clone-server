import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../shared/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: number) {
        return this.userRepository.findById(id, ['posts']);
    }

    create(dto: CreateUserDto) {
        return this.userRepository.createUser(dto);
    }

    async remove(id: number) {
        await this.userRepository.removeById(id);
        return HttpStatus.NO_CONTENT;
    }
}
