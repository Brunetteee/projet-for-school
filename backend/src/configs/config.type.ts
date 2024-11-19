export type Config = {
  app: AppConfig;
  database: dbConfig;
  redis: redisConfig;
  aws: awsConfig;
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
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
};
