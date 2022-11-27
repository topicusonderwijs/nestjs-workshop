import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppConfig } from './main.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    //Apply some app config like global validation. We do this in a separate function so we can re-use this in the tests
    applyAppConfig(app);

    await app.listen('3000', () => {
        console.log(`Server running on port 3000`);
    });
}

bootstrap();
