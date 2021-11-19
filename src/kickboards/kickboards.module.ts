import { Module } from '@nestjs/common';
import { KickboardsService } from './kickboards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kickboard } from './kickboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kickboard])],
  exports: [KickboardsService],
  providers: [KickboardsService],
})
export class KickboardsModule {}
