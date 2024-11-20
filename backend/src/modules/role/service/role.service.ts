import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../../database/entities/role-entity';
import { RoleRepository } from '../../repositories/services/role.repository';
import { IRole } from '../models/interfaces/role.interface';
import { UpdateRoleReqDto } from '../models/dto/req/update-role.req.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async getRole(userRole: IRole): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ id: userRole.roleId });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  public async generateRole(userRole: IRole): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ name: userRole.name });
    if (role) {
      throw new Error('Role already exists');
    }
    const newRole = await this.roleRepository.save(
      this.roleRepository.create({ name: userRole.name }),
    );
    return newRole;
  }

  public async updateRole(
    userRole: IRole,
    dto: UpdateRoleReqDto,
  ): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({
      id: userRole.roleId,
    });
    if (!role) {
      throw new Error('Role not found');
    }
    this.roleRepository.merge(role, dto);
    return await this.roleRepository.save(role);
  }
}
