import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../v1/user/dto/create-user.dto';
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { FindUserDto } from '../../v1/user/dto/find-user.dto';
import { UpdateUserDto } from '../../v1/user/dto/update-user.dto';

type UserRelations = 'posts' | 'comments';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor() {
        super();
    }

    findAll() {
        return this.find();
    }

    async findById(id: number, relations?: UserRelations[]) {
        try {
            return await this.findOneOrFail(id, { relations });
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }

    async findByProps(dto: FindUserDto) {
        try {
            return await this.findOneOrFail(dto);
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }

    async createUser(dto: CreateUserDto) {
        try {
            const user = new User(dto);
            await user.save();
            delete user.password;
            return user;
        } catch (e) {
            if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
                throw new BadRequestException('Account with this email already exists.');
            } else if (/(username)[\s\S]+(already exists)/.test(e.detail)) {
                throw new BadRequestException('Username with this email already exists.');
            } else {
                throw new HttpException('User creation was failed', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.findById(id);
        Object.keys(dto).forEach((key) => {
            user[key] = dto[key];
        });
        return await user.save();
    }

    async removeById(id: number) {
        await this.findById(id);
        const { affected } = await this.delete(id);
        if (!affected) {
            throw new HttpException('User deletion was failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return !!affected;
    }
}
