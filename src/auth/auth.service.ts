import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "users/users.service";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { SignInDto } from "./dto/auth-login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService,
        private configService: ConfigService) { }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findByEmail(signInDto.email);
        if (!user) {
            throw new UnauthorizedException("Access not granted");
        }
        const saltRounds = this.configService.get('auth.saltRounds');
        const hash = await bcrypt.hash(signInDto.password, saltRounds);
        const isMatch = await bcrypt.compare(user.password, hash);
        if (!isMatch) {
            throw new UnauthorizedException("Access not granted");
        }
        const payload = { email: user.email, id: user.id };
        const token = await this.jwtService.signAsync(payload);
        return { token }

    }

    async facebookLogin() { }

    async appleLogin() { }

    async googleLogin() { }

}