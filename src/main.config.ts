import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

export const applyAppConfig = (app: INestApplication, logger: Logger) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    app.useLogger(logger);
    const config = new DocumentBuilder()
        .setTitle('Topicus Pizza server')
        .setDescription('Api server for pizza management')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
};
