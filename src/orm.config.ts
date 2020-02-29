import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
        migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
};

let ormconfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'sqlite',
    database: './target/sqlite-dev-db.sql',
    logging: true,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN,
};

if (process.env.NODE_ENV === 'prod') {
    ormconfig = {
        name: 'default',
        type: 'postgres',
        database: 'BookAPI',
        url: 'postgres://process.env.POSTGRES_USERNAME:process.env.POSTGRES_PASSWORD@localhost:5432/BookAPI',
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}

if (process.env.NODE_ENV === 'test') {
    ormconfig = {
        name: 'default',
        type: 'sqlite',
        database: ':memory:',
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}

export { ormconfig };
