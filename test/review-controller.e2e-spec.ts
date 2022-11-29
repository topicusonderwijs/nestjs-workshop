import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/auth/guards/JwtAuthGuard';
import { Logger } from 'nestjs-pino';
import { applyAppConfig } from '../src/main.config';

describe('Review Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(true)
            .compile();

        app = moduleFixture.createNestApplication();
        const logger = app.get(Logger);
        applyAppConfig(app, logger);
        await app.init();
    });

    it('It should create review for a pizza', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: 5,
            })
            .expect(201)
            .expect((res: Response, err: any) => {
                expect(err).toBeUndefined();
                expect(res.body.stars).toEqual(5);
                expect(res.body.reviewedBy).toEqual('test-user');
                expect(res.body.pizza).not.toBeUndefined();
                expect(res.body.pizza.id).toEqual(1);
            });
    });

    it('It should return a 404 for an unknown pizza id', () => {
        return request(app.getHttpServer())
            .post('/review/123')
            .send({
                reviewedBy: 'test-user',
                stars: 5,
            })
            .expect(404);
    });

    it('It should return a 400 when stars > 5', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: 6,
            })
            .expect(400);
    });

    it('It should return a 400 when stars < 0', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: -1,
            })
            .expect(400);
    });
});
