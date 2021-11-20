import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingZone } from './parking-zone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingZoneService {
  constructor(
    @InjectRepository(ParkingZone)
    private readonly parkingZoneRepository: Repository<ParkingZone>,
  ) {}
  //
  async exists(user_lat, user_lng): Promise<boolean> {
    const query = `
    SELECT * ,
      (6371*ACOS(COS(RADIANS( ${user_lat} ))
      *COS(RADIANS(parkingzone_center_lat))
      *COS(RADIANS(parkingzone_center_lng)-RADIANS( ${user_lng} ))
      +SIN(RADIANS( ${user_lat} ))*SIN(RADIANS(parkingzone_center_lat))))
     AS distance
     FROM parking_zone
     HAVING distance <= parkingzone_radius`;

    const result = await this.parkingZoneRepository.query(query);
    if (result.length >= 1) {
      return true; // 파킹존 안에 존재
    } else {
      return false; // 파킹존 아님
    }
  }
}
