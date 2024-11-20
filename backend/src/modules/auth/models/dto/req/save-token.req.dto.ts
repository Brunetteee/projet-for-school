import { UserID } from '../../../../../common/types/entity-ids.type';

export class SaveTokenReqDto {
  userId: UserID;
  deviceId: string;
}
