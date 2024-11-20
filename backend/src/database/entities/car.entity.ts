import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarID, UserID } from '../../common/types/entity-ids.type';

import { TableNameEnum } from './enums/table-name.enum';

import { CreatedUpdatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.CARS)
export class CarEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  price: number;

  @Column()
  description?: string;

  @Column()
  image?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'uuid' })
  owner_id: UserID;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
