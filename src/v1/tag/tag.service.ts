import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from '../../shared/repositories/tag.repository';
import { SerializedResponse, SerializerService } from '../../shared/services/serializer.service';
import { Tag } from '../../shared/entities/tag.entity';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagRepository) private readonly tagRepository: TagRepository) {}

    create(dto: CreateTagDto) {
        return this.tagRepository.createTag(dto);
    }

    async findAll(): Promise<SerializedResponse<Tag[]>> {
        const tags = await this.tagRepository.findAll();
        return SerializerService.response(tags);
    }

    findOne(id: number) {
        return this.tagRepository.findById(id, ['posts']);
    }

    update(id: number, dto: UpdateTagDto) {
        return this.tagRepository.updateTag(id, dto);
    }

    async remove(id: number) {
        await this.tagRepository.removeById(id);
        return HttpStatus.NO_CONTENT;
    }
}
