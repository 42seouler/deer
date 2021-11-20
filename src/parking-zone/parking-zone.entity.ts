import { Area } from 'src/area/area.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  parkingzone_center_lat: number; // 위도

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  parkingzone_center_lng: number; // 경도

  @Column({ type: 'float' })
  parkingzone_radius: number;

  @ManyToOne(() => Area)
  area: Area;
}
