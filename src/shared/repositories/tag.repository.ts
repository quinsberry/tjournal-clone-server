import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../../v1/tag/dto/create-tag.dto';
import { UpdateTagDto } from '../../v1/tag/dto/update-tag.dto';

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

    updateTag(id: number, dto: UpdateTagDto) {
        return this.update(id, dto);
    }

    async findById(ids: number | number[]) {
        if (Array.isArray(ids)) {
            return createQueryBuilder(Tag, 'tag')
                .where('tag.id IN (:...ids)', { ids })
                .orderBy('tag.createdAt')
                .getMany();
        }
        return this.findOne({ where: { id: ids } });
    }

    removeById(id: number) {
        return this.delete(id);
    }
}
