import { Optional } from "@nestjs/common";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { RelationshipStatus, Religion } from "../interfaces/user-profile.interface";
import { Transform } from "class-transformer";
import { LowerCaseTransformer } from "utils/transformers/lower-case.transformer";
import { ValidateUserExists } from "utils/validators/user-exists.validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @Optional()
    fullname: string;

    @IsEmail()
    @Optional()
    @Transform(LowerCaseTransformer)
    email: string;

    @Optional()
    phone: string;
}

export class UpdateUserProfileDto {

    @IsOptional()
    @IsString()
    @Validate(ValidateUserExists)
    userId: string;

    @IsOptional()
    @IsString()
    dob: Date;

    @IsNumber()
    @Optional()
    height: number;

    @IsString()
    @IsOptional()
    hometown: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsOptional()
    sexuality: string;

    @IsString()
    @IsOptional()
    ethnicity: string;

    @IsString()
    @IsOptional()
    pronouns: string;

    @IsOptional()
    @IsEnum(RelationshipStatus)
    relationshipStatus: RelationshipStatus;

    @IsString()
    @IsOptional()
    vices: string;

    @IsOptional()
    @IsEnum(Religion)
    religion: Religion;

    @IsString()
    @IsOptional()
    language: string;
}
