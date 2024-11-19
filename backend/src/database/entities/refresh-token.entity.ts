import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedUpdatedModel } from './models/created-updated.model';

@Entity()
export class RefreshTokenEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  refreshToken: string;

  @Column('text', { unique: true })
  deviceId: string;
}
