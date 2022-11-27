import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const applyAppConfig = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Topicus Pizza server')
        .setDescription('Api server for pizza management')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
};
