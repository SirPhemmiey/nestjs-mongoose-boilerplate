import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "auth/guards/auth.guard";
import { Constants } from "utils/constants/constants";
import { AllExceptionsFilter } from "utils/filters/all-exceptions.filter";
import { UsersService } from "./users.service";

@Controller('user')
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getUser(@Param('id') id: string) {
        try {
            const user = await this.userService.findById(id, { password: 0 });
            return { status: Constants.SUCCESS, data: user }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error occured while retrieving user',
            }, HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }
}