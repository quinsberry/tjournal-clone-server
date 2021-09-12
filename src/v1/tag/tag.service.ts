import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from '../../shared/repositories/tag.repository';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagRepository) private readonly tagRepository: TagRepository) {
    }

    create(dto: CreateTagDto) {
        return this.tagRepository.createTag(dto);
    }

    findAll() {
        return this.tagRepository.findAll();
    }

    findOne(id: number) {
        return this.tagRepository.findById(id);
    }

    update(id: number, dto: UpdateTagDto) {
        return this.tagRepository.updateTag(id, dto);
    }

    remove(id: number) {
        return this.tagRepository.removeById(id);
    }
}
