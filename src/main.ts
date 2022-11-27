import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppConfig } from './main.config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const logger = app.get(Logger);

    applyAppConfig(app, logger);

    //[HINT] Get a reference to the ConfigService using `app.get`
    const serverPort = 3000; //change this so it uses the .env value
    await app.listen(serverPort, () => {
        logger.log(`Server running on port ${serverPort}`);
    });
}

bootstrap();
