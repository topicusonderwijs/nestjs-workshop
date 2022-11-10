import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizza.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'pizzasDb',
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PizzaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
