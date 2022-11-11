import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Pizza found by id', () => {
      return request(app.getHttpServer())
        .get('/pizza/1')
        .expect(200)
  });

  it('Pizza not found by id', () => {
    return request(app.getHttpServer())
      .get('/pizza/234')
      .expect(404)
  });

  it('Pizza with duplicate name', () => {
    return request(app.getHttpServer())
      .post('/pizza')
      .send({
        id: 1,
        name: 'Salami',
        size: 40
      })
      .expect(400);
  })
});
