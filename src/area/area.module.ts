import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './area.controller';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  exports: [TypeOrmModule],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
