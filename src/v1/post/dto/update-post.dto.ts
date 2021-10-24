import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['tags'] as const)) {
    @IsOptional()
    @IsArray({ message: 'Should be an array of numbers' })
    tags?: number[];
}
