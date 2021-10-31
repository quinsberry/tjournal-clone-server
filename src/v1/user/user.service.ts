import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../shared/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    findAll() {
        return this.userRepository.findAll();
    }

    findOne(id: number) {
        return this.userRepository.findById(id, ['posts']);
    }

    update(id: number, dto: UpdateUserDto) {
        return this.userRepository.updateUser(id, dto);
    }

    findByProps(dto: FindUserDto) {
        return this.userRepository.findByProps(dto);
    }

    create(dto: CreateUserDto) {
        return this.userRepository.createUser(dto);
    }

    async remove(id: number) {
        await this.userRepository.removeById(id);
        return HttpStatus.NO_CONTENT;
    }
}
