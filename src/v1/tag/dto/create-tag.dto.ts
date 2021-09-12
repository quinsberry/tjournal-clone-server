import { IsString } from 'class-validator';

export class CreateTagDto {
    @IsString({ message: 'Should be a string' })
    title: string;

    @IsString({ message: 'Should be a string' })
    value: string;
}
