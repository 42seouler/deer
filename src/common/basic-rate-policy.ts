import { RatePolicy } from './rate-policy';
import { UseDto } from '../calculator/use.dto';

export abstract class BasicRatePolicy implements RatePolicy {
  calculateRate(minute: number): number {
    return this.calculate(minute);
  }
  abstract calculate(minute: number): number;
}
