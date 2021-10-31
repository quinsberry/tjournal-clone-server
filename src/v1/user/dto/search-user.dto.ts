import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchUserDto extends PartialType(PickType(CreateUserDto, ['fullName', 'email', 'username'] as const)) {
    @IsOptional()
    @IsNumber({}, { message: 'Should be a number' })
    skip?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Should be a number' })
    take?: number;
}
