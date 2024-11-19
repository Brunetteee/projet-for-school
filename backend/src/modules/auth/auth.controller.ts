import { Controller, Body, Post } from '@nestjs/common';
import { UserRepository } from '../repositories/services/user.repository';
import { AuthService } from './services/auth.service';
import { SaveTokenReqDto } from './models/dto/req/save-token.req.dto';
import { TokenService } from './services/token.service';

@Controller('users')
export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: AuthService,
    private readonly tokenService: TokenService,
  ) {}
  @Post()
  private async generateAndSaveTokens(@Body() dto: SaveTokenReqDto) {
    return this.tokenService.generateAndSaveTokens(dto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
