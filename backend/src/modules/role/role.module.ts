import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RoleService } from './service/role.service';
import { RoleRepository } from '../repositories/services/role.repository';

@Module({
  controllers: [RolesController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
