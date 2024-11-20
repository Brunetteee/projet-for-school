import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { AccountTypesEnum } from '../../modules/account/models/enums/account-type.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ACCOUNT)
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: UserID;

  @Column({ type: 'enum', enum: AccountTypesEnum, unique: true })
  name: AccountTypesEnum;

  @OneToOne(() => UserEntity, (entity) => entity.account)
  user?: UserEntity[];
}
