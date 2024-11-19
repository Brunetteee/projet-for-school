import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.port, () => {
    console.log(
      `Service is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Service is running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}
void bootstrap();
