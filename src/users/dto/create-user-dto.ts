import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Validate } from "class-validator";
import { LowerCaseTransformer } from "utils/transformers/lower-case.transformer";
import { IfDuplicateEmail } from "utils/validators/if-email-duplicate.validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsEmail()
    @Transform(LowerCaseTransformer)
    @Validate(IfDuplicateEmail)
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsStrongPassword()
    password: string;
}
