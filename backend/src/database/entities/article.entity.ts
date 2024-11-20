import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleID, UserID } from '../../common/types/entity-ids.type';

import { TableNameEnum } from './enums/table-name.enum';

import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';
import { CreatedUpdatedModel } from './models/created-updated.model';

@Entity(TableNameEnum.ARTICLE)
export class ArticleEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: ArticleID;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];
}
