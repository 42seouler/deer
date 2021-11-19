import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegularPolicy } from './regular-policy';
import { RegularPoliciesService } from './regular-policies.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegularPolicy])],
  exports: [RegularPoliciesService],
  providers: [RegularPoliciesService],
})
export class RegularPolicesModule {}
