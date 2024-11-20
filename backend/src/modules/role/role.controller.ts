import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { RoleRepository } from '../repositories/services/role.repository';
import { RoleService } from './service/role.service';
import { RoleResDto } from './models/dto/res/role.res.dto';
import { RolesMapper } from './service/roles.mapper';
import { IRole } from './models/interfaces/role.interface';
import { CurrentRole } from '../auth/decorators/role.decorator';
import { UpdateRoleReqDto } from './models/dto/req/update-role.req.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RoleService,
  ) {}

  @ApiBearerAuth()
  @Get('get-role')
  public async getRole(@Param('roleName') name: IRole): Promise<RoleResDto> {
    const role = await this.roleService.getRole(name);
    return RolesMapper.toResDto(role);
  }

  @ApiBearerAuth()
  @Get('generate-role')
  public async generateRole(
    @Param('roleName') name: IRole,
  ): Promise<RoleResDto> {
    const role = await this.roleService.generateRole(name);
    return RolesMapper.toResDto(role);
  }

  @ApiBearerAuth()
  @Patch('update-role')
  public async updateRole(
    @CurrentRole() roleData: IRole,
    @Body() roleName: UpdateRoleReqDto,
  ) {
    const result = await this.roleService.updateRole(roleData, roleName);
    return RolesMapper.toResDto(result);
  }
}
