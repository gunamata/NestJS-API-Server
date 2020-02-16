import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import Book from '../src/domain/book.entity';
import { BookService } from '../src/service/book.service';

describe('Book Controller', () => {
  let app: INestApplication;

  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(BookService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all books ', async () => {
    const getEntities: Book[] = (
      await request(app.getHttpServer())
        .get('/api/books')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET books by id', async () => {
    const getEntity: Book = (
      await request(app.getHttpServer())
        .get('/api/books/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create books', async () => {
    const createdEntity: Book = (
      await request(app.getHttpServer())
        .post('/api/books')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update books', async () => {
    const updatedEntity: Book = (
      await request(app.getHttpServer())
        .put('/api/books')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE books', async () => {
    const deletedEntity: Book = (
      await request(app.getHttpServer())
        .delete('/api/books/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
