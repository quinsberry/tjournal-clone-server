import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @Length(3, undefined, { message: 'Full name should contain at least 3 characters' })
    @IsString({ message: 'Should be a string' })
    readonly fullName?: string;

    @IsEmail(undefined, { message: 'Invalid email' })
    readonly email: string;

    @IsString({ message: 'Should be a string' })
    @Matches(/^[a-z0-9_.-]{3,16}$/, {
        message: "Username can only contain lowercase letters, numbers, '_', '-' and '.' with min 3 max 16 length",
    })
    readonly username: string;

    @Length(6, 32, { message: 'Length should be more than 6 and less than 32 characters' })
    readonly password: string;
}
