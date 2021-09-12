import { IsString } from 'class-validator';

export class UpdateTagDto {
    @IsString({ message: 'Should be a string' })
    title: string;
}
