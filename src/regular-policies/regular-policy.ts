import { BasicRatePolicy } from '../common/basic-rate-policy';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RegularPolicy extends BasicRatePolicy {
  @PrimaryColumn()
  private id: string;
  @Column()
  private basic: number;
  @Column()
  private ratePerMinute: number;

  calculate(minute: number): number {
    return this.basic + this.ratePerMinute * minute;
  }
}
