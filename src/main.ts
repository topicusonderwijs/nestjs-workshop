import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const logger = app.get(Logger);
    app.useLogger(logger);
    const config = new DocumentBuilder()
        .setTitle('Topicus Pizza server')
        .setDescription('Api server for pizza management')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const configService = app.get<ConfigService>(ConfigService);
    const serverPort = configService.get('server.port');
    await app.listen(serverPort, () => {
        logger.log(`Server running on port ${serverPort}`);
    });
}

bootstrap();
