import { IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  readonly area_id: string;

  @IsString()
  readonly area_boundary: string;

  @IsString()
  readonly area_center: string;

  @IsString()
  readonly area_coords: string;
}
