import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from '../../area/entities/area.entity';

@Entity()
export class Forbidden {
  @PrimaryGeneratedColumn()
  forbidden_id: number;

  @Column({ type: 'polygon' })
  forbidden_area_boundary: number;

  @Column({ type: 'linestring' })
  forbidden_area_coords: number;

  @ManyToOne(() => Area, (area) => area.forbidden)
  area: Area;
}
