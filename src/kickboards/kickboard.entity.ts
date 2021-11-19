import { Area } from 'src/area/area.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Kickboard {
  @PrimaryColumn()
  deerName: string;

  @ManyToOne(() => Area)
  area: Area;
}
