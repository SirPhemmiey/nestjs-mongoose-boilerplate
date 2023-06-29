import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserProfile, UserProfileSchema } from "./schemas/user-profile.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ValidateUserExists } from "utils/validators/user-exists.validator";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
        { name: UserProfile.name, schema: UserProfileSchema }]),
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
    providers: [UsersService, ValidateUserExists],
    exports: [UsersService]
})

export class UsersModule { }
