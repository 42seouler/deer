import { IsNumber } from 'class-validator';

export class CreateParkingzoneDto {
  @IsNumber()
  parkingzone_id: number;

  @IsNumber()
  parkingzone_center_lat: number;

  @IsNumber()
  parkingzone_center_lng: number;

  @IsNumber()
  parkingzone_radius: number;
}
