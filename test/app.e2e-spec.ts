import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('App', () => {
    let app: INestApplication;

    const infoService = {
        'activeProfiles': 'no',
        'display-ribbon-on-profiles': 'no',
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

  it('/GET up running info OK', () =>
    request(app.getHttpServer())
      .get('/management/info')
      .expect(200)
      .expect(infoService));

    afterEach(async () => {
        await app.close();
    });
});
