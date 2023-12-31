import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "users/users.service";

@Injectable()
@ValidatorConstraint()
export class IfDuplicateEmail implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) { }

    async validate(email: string, validationArguments: ValidationArguments) {
        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                return false;
            }
            return true;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `Email "${args.value}" already exists`;
    }
}