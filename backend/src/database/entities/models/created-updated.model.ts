import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedModel {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
