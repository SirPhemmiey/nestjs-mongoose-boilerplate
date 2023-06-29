import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { AppConfig } from "./config.type";
import { registerAs } from "@nestjs/config";
import validateConfig from "../utils/validate-config";

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariablesValidator {
    @IsEnum(Environment)
    @IsOptional()
    ENVIRONMENT: Environment;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    APP_PORT: number;

    @IsUrl({ require_tld: false })
    @IsOptional()
    FRONTEND_DOMAIN: string;

    @IsUrl({ require_tld: false })
    @IsOptional()
    BACKEND_DOMAIN: string;

    @IsString()
    @IsOptional()
    API_PREFIX: string;

    @IsString()
    @IsOptional()
    IS_DEVELOPMENT: boolean;

    @IsString()
    @IsOptional()
    IS_PRODUCTION: boolean;

    @IsString()
    @IsOptional()
    IS_TEST: boolean;

}

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        environment: process.env.ENVIRONMENT || 'development',
        name: process.env.APP_NAME || 'app',
        workingDirectory: process.env.PWD || process.cwd(),
        frontendDomain: process.env.FRONTEND_DOMAIN,
        backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
        port: process.env.APP_PORT
            ? parseInt(process.env.APP_PORT, 10)
            : process.env.PORT
                ? parseInt(process.env.PORT, 10)
                : 3000,
        apiPrefix: process.env.API_PREFIX || 'api',
        isProduction: process.env.ENVIRONMENT === 'production',
        isDevelopment: process.env.ENVIRONMENT === 'development',
        isTest: process.env.ENVIRONMENT === 'test'
    };
});
