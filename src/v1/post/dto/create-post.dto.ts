import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString({ message: 'Should be a string' })
    title: string;

    @IsString({ message: 'Should be a string' })
    body: string;

    @IsOptional()
    @IsString({ message: 'Should be an array of strings', each: true })
    tags: string[];
}
