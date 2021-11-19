import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kickboard } from './kickboard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KickboardsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Kickboard)
    private readonly kickboardRepository: Repository<Kickboard>,
  ) {}

  //todo 서버 부트 스트랩 될 때 DB 초기화
  onApplicationBootstrap(): any {
    console.log('test');
    return 'string';
  }

  //todo 킥보드의 유효
  validationAndReturnAreaInfo(useDeerName: string): string {
    //todo 킥보드의 유효성 검사 (유효하지 않을 경우 throw Error)
    //todo 킥보드의 Area의 ID를 반환
    return 'konkuk';
  }
}
