import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { IfUserExists } from "utils/validators/if-user-exists.validator";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },]),
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
    controllers: [UsersController],
    providers: [UsersService, IfUserExists],
    exports: [UsersService]
})

export class UsersModule { }
