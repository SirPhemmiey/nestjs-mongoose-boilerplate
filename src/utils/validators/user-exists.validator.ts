import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "users/users.service";

@Injectable()
@ValidatorConstraint({ name: 'ValidateUserExists', async: true })
export class ValidateUserExists implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) { }

    async validate(id: string, validationArguments: ValidationArguments) {
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `User ID ${args.value} does not exist`;
    }
}