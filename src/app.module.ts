import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizza.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './auth/services/users.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

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
        LoggerModule.forRoot({
            pinoHttp: {
                level: 'debug',
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true,
                    },
                },
            },
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            debug: true,
            playground: true,
            autoSchemaFile: true,
            sortSchema: true,
            context: ({ req }) => ({ req })
        }),
        PizzaModule,
        AuthModule,
    ],
    controllers: [],
    providers: [UsersService],
})
export class AppModule {}
