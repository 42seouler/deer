import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parkingzone {
  @PrimaryGeneratedColumn()
  parkingzone_id: number;

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  parkingzone_center_lat: number; // 위도

  @Column({ type: 'decimal', precision: 18, scale: 10 })
  parkingzone_center_lng: number; // 경도

  @Column({ type: 'float' })
  parkingzone_radius: number;

  /*  @ManyToOne(() => Area, (area) => area.parkingzone)
    area: Area;*/
}
