import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [JwtModule],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get('auth.secret'),
                signOptions: { expiresIn: configService.get('auth.expires') },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule { }