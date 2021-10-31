import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
    @IsEmail(undefined, { message: 'Invalid email' })
    readonly email: string;

    @Length(6, 32, { message: 'Length should be more than 6 and less than 32 characters' })
    readonly password: string;
}
