import { IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsNumber()
  readonly area_id: number;

  @IsString()
  readonly area_boundary: string;

  @IsString()
  readonly area_center: string;

  @IsString()
  readonly area_coords: string;
}
