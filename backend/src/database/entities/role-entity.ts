import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleID } from '../../common/types/entity-ids.type';

import { UserEntity } from './user.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { RoleEnum } from '../../modules/role/models/enums/role.enum';

@Entity(TableNameEnum.ROLES)
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: RoleID;

  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  name: RoleEnum;

  @OneToOne(() => UserEntity, (entity) => entity.userRole)
  user?: UserEntity[];
}
