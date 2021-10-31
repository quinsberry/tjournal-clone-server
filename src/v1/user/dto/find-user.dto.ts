import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class FindUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {
    @IsOptional()
    id?: number;
}
