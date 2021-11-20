import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingZone } from './parking-zone.entity';
import { ParkingZoneService } from './parking-zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingZone])],
  exports: [ParkingZoneService],
  providers: [ParkingZoneService],
})
export class ParkingZoneModule {}
