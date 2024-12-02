import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [forwardRef(() => CarsModule), AuthModule, FileStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
