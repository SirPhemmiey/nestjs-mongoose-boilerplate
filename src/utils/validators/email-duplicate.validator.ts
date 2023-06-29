import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "users/users.service";

@Injectable()
@ValidatorConstraint()
export class IsDuplicateEmail implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) { }

    async validate(email: string, validationArguments: ValidationArguments) {
        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `Email "${args.value}" already exists`;
    }
}