import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from '../../shared/repositories/tag.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TagRepository])],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {
}
