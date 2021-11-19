import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { UseDto } from './use.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  calculateRate(@Body() use: UseDto): any {
    return this.calculatorService.calculateRate(use);
  }
}
