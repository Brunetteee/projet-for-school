export type Config = {
  app: AppConfig;
  database: dbConfig;
  redis: redisConfig;
  aws: awsConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
};
export type AppConfig = {
  port: number;
  host: string;
};

export type dbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};

export type redisConfig = {
  host: string;
  port: number;
  password: string;
};

export type awsConfig = {
  accessIdKey: string;
  secretKey: string;
  bucketName: string;
  region: string;
  acl: string;
  endpoint: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
};
