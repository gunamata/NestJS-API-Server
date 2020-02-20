"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
        migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
};
let ormconfig = {
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
exports.ormconfig = ormconfig;
if (process.env.NODE_ENV === 'prod') {
    exports.ormconfig = ormconfig = {
        name: 'default',
        type: 'postgres',
        database: 'BookAPI',
        url: 'postgres://postgres:postgres@localhost:5432/BookAPI',
        logging: false,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}
if (process.env.NODE_ENV === 'test') {
    exports.ormconfig = ormconfig = {
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
//# sourceMappingURL=orm.config.js.map