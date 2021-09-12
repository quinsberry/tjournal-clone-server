import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../../v1/tag/dto/create-tag.dto';
import { UpdateTagDto } from '../../v1/tag/dto/update-tag.dto';
import { HttpStatus } from '@nestjs/common';

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
        return this.update(id, dto);
    }

    findById(id: number) {
        return this.findOne(id);
    }

    removeById(id: number) {
        return this.delete(id);
    }
}
