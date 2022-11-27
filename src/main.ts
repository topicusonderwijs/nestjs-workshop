import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { applyAppConfig } from './main.config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const logger = app.get(Logger);

    applyAppConfig(app, logger);

    const configService = app.get<ConfigService>(ConfigService);
    const serverPort = configService.get('server.port');
    await app.listen(serverPort, () => {
        logger.log(`Server running on port ${serverPort}`);
    });
}

bootstrap();
