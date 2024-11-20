import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedUpdatedModel } from './models/created-updated.model';
import { TableNameEnum } from './enums/table-name.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  refreshToken: string;

  @Column('text', { unique: true })
  deviceId: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
