import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

import { TagID } from '../../common/types/entity-ids.type';
import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreatedUpdatedModel } from './models/created-updated.model';

@Entity(TableNameEnum.TAG)
export class TagEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: TagID;

  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticleEntity[];

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;
}
