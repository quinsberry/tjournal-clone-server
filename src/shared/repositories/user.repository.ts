import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../v1/user/dto/create-user.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

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

    createUser(dto: CreateUserDto) {
        return this.save(dto);
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
