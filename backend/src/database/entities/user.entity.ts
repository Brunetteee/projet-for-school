import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { ArticleEntity } from './article.entity';

import { TableNameEnum } from './enums/table-name.enum';

import { RefreshTokenEntity } from './refresh-token.entity';
import { CreatedUpdatedModel } from './models/created-updated.model';
import { RoleEnum } from '../../modules/role/models/enums/role.enum';
import { CarEntity } from './car.entity';
import { RoleEntity } from './role-entity';
import { AccountEntity } from './account-entity';

@Index(['name'])
@Entity(TableNameEnum.USERS)
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'buyer' })
  role: RoleEnum;

  @Column({ type: 'boolean', default: false })
  isPremium: boolean;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.owner)
  cars?: CarEntity[];

  @OneToOne(() => RoleEntity, (entity) => entity.user)
  userRole?: RoleEntity;

  @OneToOne(() => AccountEntity, (entity) => entity.user)
  account?: AccountEntity;
}
