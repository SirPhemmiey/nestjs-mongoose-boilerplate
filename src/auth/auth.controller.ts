import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseFilters } from "@nestjs/common";
import { AllExceptionsFilter } from "utils/filters/all-exceptions.filter";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth-login.dto";

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
    constructor(readonly authService: AuthService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        try {
            return this.authService.signIn(signInDto);
        } catch (error) {
            throw new UnauthorizedException('Incorrect login details');
        }
    }
}