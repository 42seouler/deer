import { Injectable } from '@nestjs/common';
import { RegularPolicy } from './regular-policy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegularPoliciesService {
  constructor(
    @InjectRepository(RegularPolicy)
    private readonly regularPolicyRepository: Repository<RegularPolicy>,
  ) {}

  async calculateRegularRate(area: string, usedTime: number): Promise<number> {
    //todo 요금제 유효성 검사 (유효하지 않을 경우 throw Error)
    const regularPolicy = await this.regularPolicyRepository.findOne(area);
    //todo 계산된 요금 반환
    return regularPolicy.calculate(usedTime);
  }
}
