import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  AccountTypesEnum,
  RoleEnum,
} from '../../modules/users/models/enums/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'buyer' })
  role: RoleEnum;

  @Column('text', { nullable: true })
  bio?: string;

  @Column({ default: 'basic' })
  accountType: AccountTypesEnum;
}
