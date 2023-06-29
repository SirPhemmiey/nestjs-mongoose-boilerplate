import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "auth/guards/auth.guard";
import { Constants } from "utils/constants/constants";
import { AllExceptionsFilter } from "utils/filters/all-exceptions.filter";
import { ValidateMongoId } from "utils/validators/mongo-id.validator";
import { UpdateUserDto, UpdateUserProfileDto } from "./dto/update-user-dto";
import { UsersService } from "./users.service";

@Controller('user')
// @UseFilters(ValidationFilter)
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Patch('/update-profile')
    async updateUserProfile(@Body() updateUserProfileDto: UpdateUserProfileDto,
        @Body('userId', ValidateMongoId) userId: string) {
        try {
            updateUserProfileDto.userId = userId;
            await this.userService.updateUserProfile(userId, updateUserProfileDto);
            return { status: Constants.SUCCESS }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error occured while updating user',
            }, HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/')
    async updateUser(@Body() updateUserDto: UpdateUserDto,
        @Body('userId') userId: string) {
        try {
            return this.userService.updateUser(userId, updateUserDto);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error occured while updating user profile',
            }, HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    async getUser(@Param('id') id: string) {
        try {
            const user = await this.userService.findById(id, { password: 0 });
            console.log({ controllerUser: user })
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