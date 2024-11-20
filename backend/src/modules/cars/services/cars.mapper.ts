import { UserEntity } from '../../../database/entities/user.entity';
import { CarResDto } from '../models/dto/res/car.res.dto';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload-interface';
import { CarEntity } from '../../../database/entities/car.entity';

export class CarsMapper {
  public static forResDto(car: CarEntity): CarResDto {
    return {
      ownerId: car.owner_id,
      carId: car.id,
      brand: car.brand,
      model: car.model,
      price: car.price,
      description: car.description,
      image: car.image,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
