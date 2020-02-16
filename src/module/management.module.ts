import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementController } from '../web/rest/management.controller';

@Module({
    controllers: [ ManagementController],
})
export class ManagementModule {}
