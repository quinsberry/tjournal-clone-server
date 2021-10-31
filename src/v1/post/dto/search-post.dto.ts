import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class SearchPostDto {
    @IsOptional()
    @IsString({ message: 'Should be a string' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Should be a string' })
    body?: string;

    @IsOptional()
    @Matches('/^DESC|ASC/i', 'i')
    views?: 'DESC' | 'ASC';

    @IsOptional()
    @IsNumber({}, { message: 'Should be a number' })
    skip?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Should be a number' })
    take?: number;

    @IsOptional()
    tags?: number | number[];
}
