import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Match } from "../../utils/decorators/match.decorator";
import { LowerCaseTransformer } from "utils/transformers/lower-case.transformer";
import { Transform } from "class-transformer";


export class SignupDto {
    @IsNotEmpty()
    @IsString()
    readonly fullname: string;

    @IsNotEmpty()
    @IsEmail()
    @Transform(LowerCaseTransformer)
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string

    @IsNotEmpty()
    @Match('password')
    readonly confirmPassword: string
}