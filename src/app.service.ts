import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area/area.entity';
import { Kickboard } from './kickboards/kickboard.entity';
import { RegularPoliciesService } from './regular-policies/regular-policies.service';
import { RegularPolicy } from './regular-policies/regular-policy';
import { ParkingZone } from './parking-zone/parking-zone.entity';
import { ForbiddenArea } from './forbidden-area/forbidden-area.entity';
import { DiscountPenaltyInfo } from './discount-penalty-info/discount-penalty-info';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Kickboard)
    private readonly kickboardRepository: Repository<Kickboard>,
    @InjectRepository(RegularPolicy)
    private readonly regularPolicyRepository: Repository<RegularPolicy>,
    @InjectRepository(ParkingZone)
    private readonly parkingZoneRepository: Repository<ParkingZone>,
    @InjectRepository(ForbiddenArea)
    private readonly forbiddenAreaRepository: Repository<ForbiddenArea>,
    @InjectRepository(DiscountPenaltyInfo)
    private readonly discountPenaltyInfoRepository: Repository<DiscountPenaltyInfo>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  // 서버 부트 스트랩 될 때 DB 초기화
  async onApplicationBootstrap(): Promise<any> {
    const kickboards = await this.kickboardRepository.query(
      `INSERT IGNORE INTO kickboard(deer_name, area_id) VALUES('건대1', '건대'), ('건대2', '건대'), ('여수1', '여수'), ('여수2', '여수')`,
    );

    const areas = this.areaRepository.query(
      `INSERT IGNORE INTO area(id, area_boundary, area_center, area_coords) VALUES
      (
        '건대', 
        ST_GEOMFROMTEXT(
          'POLYGON(( 37.571562 127.080008, 37.570788 127.086038, 37.558816 127.087727, 37.554418 127.094311, 37.550332 127.091142, 37.548932 127.093407, 37.544818 127.090204, 37.544015 127.107361, 37.527082 127.085368, 37.538147 127.043375, 37.550774 127.041713, 37.548957 127.062508, 37.571562 127.080008))'
        ),
        ST_GEOMFROMTEXT('POINT(37.562057 127.096092)'), 
        ST_GEOMFROMTEXT(
          'LINESTRING(37.571562 127.080008, 37.570788 127.086038, 37.558816 127.087727, 37.554418 127.094311, 37.550332 127.091142, 37.548932 127.093407, 37.544818 127.090204, 37.544015 127.107361, 37.527082 127.085368, 37.538147 127.043375, 37.550774 127.041713, 37.548957 127.062508, 37.571562 127.080008)')
      ),
      (
        '여수', 
        ST_GEOMFROMTEXT(
          'POLYGON((0 0, 2 0, 11 11, 0 2, 0 0))'
        ), 
        ST_GEOMFROMTEXT('POINT(0 0)'), 
        ST_GEOMFROMTEXT('LINESTRING(0 0, 1 0)')
      )`,
    );

    const regularPolicy = this.regularPolicyRepository.query(
      `INSERT IGNORE INTO regular_policy(id, basic, rate_per_minute) VALUES
       ('건대', 3000, 300),
       ('여수', 4000, 400)`,
    );


    const discountPenaltyInfo = this.discountPenaltyInfoRepository.query(
      `INSERT IGNORE INTO discount_penalty_info(id, type, category, content, policy, price) VALUES
       (1, 'discount', 'all', null, 'parkingZone', 30),
       (2, 'discount', 'all', null, 'useIn30Minute', 0),
       (3, 'discount', 'kickboard', '건대1', 'parkingZoneFree', 0),
       (4, 'penalty', 'all', null, 'forbiddenArea', 6000),
       (5, 'penalty', 'area', '여수', 'outOfRange', 100),
       (6, 'penalty', 'area', '건대', 'outOfRange', 200)`,
    );


    const parkingZone = this.parkingZoneRepository.query(
      `INSERT IGNORE INTO parking_zone(id, parkingzone_center_lat, parkingzone_center_lng, parkingzone_radius, area_id) VALUES
       (1, 37.547005, 127.074779, 0.05, '건대'),
       (2, 37.541134, 127.073721, 0.05, '건대'),
       (3, 37.544263, 127.057211, 0.05, '건대'),
       (4, 37.539386, 127.053021, 0.05, '건대')`,
    );

    const forbiddenArea = this.forbiddenAreaRepository.query(
      `INSERT IGNORE INTO forbidden_area(id, forbidden_area_boundary, forbidden_area_coords, area_id) VALUES
      (
        '건대1', 
        ST_GEOMFROMTEXT(
          'POLYGON(( 37.551938 127.076721, 37.552133 127.089132, 37.545142 127.085223, 37.545448 127.079719, 37.551938 127.076721))'
        ),
        ST_GEOMFROMTEXT('LINESTRING(37.551938 127.076721, 37.552133 127.089132, 37.545142 127.085223, 37.545448 127.079719, 37.551938 127.076721)'),
        '건대'
      ),
      (
        '건대2', 
        ST_GEOMFROMTEXT(
          'POLYGON( (37.538488 127.071729, 37.537754 127.074005, 37.536153 127.073489, 37.536972 127.071077, 37.538488 127.071729) )'
        ), 
        ST_GEOMFROMTEXT('LINESTRING(37.538488 127.071729, 37.537754 127.074005, 37.536153 127.073489, 37.536972 127.071077, 37.538488 127.071729)'),
        '건대'
      )`,
    );

    return 'insert executed';
  }
}
