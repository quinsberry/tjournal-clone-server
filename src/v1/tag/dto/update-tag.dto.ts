import { PickType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PickType(CreateTagDto, ['title'] as const) {}
