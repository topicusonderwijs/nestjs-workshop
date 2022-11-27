import { INestApplication, ValidationPipe } from '@nestjs/common';

export const applyAppConfig = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
};
