import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const applyAppConfig = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    //Initialize swagger for OpenAPI spec documentation
    const config = new DocumentBuilder()
        .setTitle('Topicus Pizza server')
        .setDescription('Api server for pizza management')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    //Setup the docs on the path `/api`
    SwaggerModule.setup('api', app, document);
};
