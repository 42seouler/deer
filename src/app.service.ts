import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area/area.entity';
import { Kickboard } from './kickboards/kickboard.entity';
import { RegularPolicy } from './regular-policies/regular-policy';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Kickboard)
    private readonly kickboardRepository: Repository<Kickboard>,
    @InjectRepository(RegularPolicy)
    private readonly regularPolicyRepository: Repository<RegularPolicy>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // 서버 부트 스트랩 될 때 DB 초기화
  async onApplicationBootstrap(): Promise<any> {
    const areas = this.areaRepository.query(
      `INSERT IGNORE INTO area(id, area_boundary, area_center, area_coords) VALUES
      (
        '건대', 
        ST_GEOMFROMTEXT(
          'POLYGON((0 0, 2 0, 11 11, 0 2, 0 0))'
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

    await this.kickboardRepository
      .query(`INSERT IGNORE INTO kickboard(deerName, areaId)
    SELECT '건대1', id FROM area
    WHERE id = '건대'`);
    await this.kickboardRepository
      .query(`INSERT IGNORE INTO kickboard(deerName, areaId)
    SELECT '건대2', id FROM area
    WHERE id = '건대'`);
    await this.kickboardRepository
      .query(`INSERT IGNORE INTO kickboard(deerName, areaId)
    SELECT '여수1', id FROM area
    WHERE id = '여수'`);
    await this.kickboardRepository
      .query(`INSERT IGNORE INTO kickboard(deerName, areaId)
    SELECT '여수2', id FROM area
    WHERE id = '여수'`);

    const regularPolicy = this.regularPolicyRepository
      .createQueryBuilder()
      .insert()
      .into(RegularPolicy)
      .values([
        { id: '건대', basic: 3000, ratePerMinute: 300 },
        { id: '여수', basic: 4000, ratePerMinute: 400 },
      ])
      .orIgnore()
      .execute();

    return 'insert executed';
  }
}
