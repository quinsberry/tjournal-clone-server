import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString({ message: 'Should be a string' })
    title: string;

    @IsString({ message: 'Should be a string' })
    body: string;

    @IsOptional()
    @IsArray({ message: 'Should be an array of numbers' })
    @ArrayNotEmpty()
    tags?: number[];
}
