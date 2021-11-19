import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Parkingzone } from '../../parkingzone/entities/parkingzone.entity';
import { Forbidden } from '../../forbidden/entities/forbidden.entity';

@Entity()
export class Area {
  @PrimaryColumn()
  area_id: number;

  @Column({ type: 'polygon' })
  area_boundary: number;

  @Column({ type: 'point' })
  area_center: number;

  @Column({ type: 'linestring' })
  area_coords: number;

/*  @OneToMany(() => Parkingzone, (parkingzone) => parkingzone.area)
  parkingzone: Parkingzone[];

  @OneToMany(() => Forbidden, (forbidden) => forbidden.area)
  forbidden: Forbidden[];*/
}
