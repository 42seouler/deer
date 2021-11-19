import { UseDto } from '../calculator/use.dto';

export interface RatePolicy {
  calculateRate(minute: number): any;
}
