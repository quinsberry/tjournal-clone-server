import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../v1/user/dto/create-user.dto';
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { FindUserDto } from '../../v1/user/dto/find-user.dto';
import { UpdateUserDto } from '../../v1/user/dto/update-user.dto';
import { SearchUserDto } from '../../v1/user/dto/search-user.dto';

type UserRelations = 'posts' | 'comments';

enum SearchDefaults {
    Limit = 10,
    Skip = 0,
}

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

    async findUserByPost(userId: number, postId: number, relations?: UserRelations[]) {
        try {
            const qb = await createQueryBuilder(User, 'u')
                .leftJoinAndSelect('u.posts', 'p')
                .where('u.id = :userId', { userId })
                .andWhere('p.id = :postId', { postId });

            if (relations.includes('comments')) {
                qb.leftJoinAndSelect('u.comments', 'c');
            }

            return qb.getOneOrFail();
        } catch (e) {
            throw new NotFoundException(`User has no post with provided id`);
        }
    }

    async findByProps(dto: FindUserDto) {
        try {
            return await this.findOneOrFail(dto);
        } catch (e) {
            throw new NotFoundException('User not found');
        }
    }

    // search(dto: SearchPostDto) {
    //     const qb = this.createQueryBuilder('p')
    //         .leftJoinAndSelect('p.tags', 'tags')
    //         .limit(dto.take ?? SearchDefaults.Limit)
    //         .offset(dto.skip ?? SearchDefaults.Skip);
    //
    //     if (dto.views) {
    //         qb.orderBy('views', dto.views);
    //     }
    //
    //     if (dto.body) {
    //         qb.andWhere('p.body ILIKE :body', { body: `%${dto.body}%` });
    //     }
    //
    //     if (dto.title) {
    //         qb.andWhere('p.title ILIKE :title', { title: `%${dto.title}%` });
    //     }
    //
    //     if (dto.tags) {
    //         if (Array.isArray(dto.tags)) {
    //             // TODO: It doesn't work properly. Selecting just the last tag id.
    //             dto.tags.map((tag) => {
    //                 qb.andWhere('tags.id = :tag', { tag });
    //             });
    //         } else {
    //             qb.andWhere('tags.id = :id', { id: dto.tags });
    //         }
    //     }
    //
    //     return qb.getManyAndCount();
    // }

    async search(dto: SearchUserDto) {
        const qb = this.createQueryBuilder('u')
            .limit(dto.take ?? SearchDefaults.Limit)
            .offset(dto.skip ?? SearchDefaults.Skip);

        if (dto.fullName) {
            qb.andWhere('u.fullName ILIKE :fullName', { fullName: `%${dto.fullName}%` });
        }

        if (dto.email) {
            qb.andWhere('u.email ILIKE :email', { email: `%${dto.email}%` });
        }

        if (dto.username) {
            qb.andWhere('u.username ILIKE :username', { username: `%${dto.username}%` });
        }

        return await qb.getManyAndCount();
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
