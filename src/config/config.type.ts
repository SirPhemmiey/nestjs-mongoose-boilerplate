export type AppConfig = {
  environment: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
};

export type AuthConfig = {
  secret?: string;
  expires?: string;
  saltRounds?: number;
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
};

export type TwitterConfig = {
  consumerKey?: string;
  consumerSecret?: string;
};

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};
