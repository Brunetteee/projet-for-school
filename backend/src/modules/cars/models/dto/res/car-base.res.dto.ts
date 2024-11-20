import { CarID, UserID } from '../../../../../common/types/entity-ids.type';

export class CarBaseResDto {
  ownerId: UserID;
  carId: CarID;
  brand: string;
  model: string;
  price?: number;
  description?: string;
  image?: string;
}
