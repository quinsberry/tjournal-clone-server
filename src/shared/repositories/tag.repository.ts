import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../../v1/tag/dto/create-tag.dto';
import { UpdateTagDto } from '../../v1/tag/dto/update-tag.dto';
import { validateFirstElementInList } from '../utils/checkers';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
    constructor() {
        super();
    }

    findAll() {
        return this.find();
    }

    createTag(dto: CreateTagDto) {
        return this.save(dto);
    }

    async updateTag(id: number, dto: UpdateTagDto) {
        const tag = await this.findById(id);
        Object.keys(dto).forEach((key) => {
            tag[key] = dto[key];
        });
        return await tag.save();
    }

    async findById<T extends number | number[]>(ids: T): Promise<T extends number ? Promise<Tag> : Promise<Tag[]>> {
        if (Array.isArray(ids)) {
            if (validateFirstElementInList(ids, (_) => !_)) {
                return [];
            }
            return await createQueryBuilder(Tag, 'tag')
                .where('tag.id IN (:...ids)', { ids })
                .orderBy('tag.createdAt')
                .getMany();
        } else {
            try {
                return await this.findOneOrFail(ids);
            } catch (e) {
                throw new NotFoundException('Tag not found');
            }
        }
    }

    async removeById(id: number) {
        await this.findById(id);
        const { affected } = await this.delete(id);
        if (!affected) {
            throw new HttpException('Tag deletion was failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return !!affected;
    }
}
