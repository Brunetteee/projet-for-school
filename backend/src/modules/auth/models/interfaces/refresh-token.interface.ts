import { UserID } from '../../../../common/types/entity-ids.type';

export interface IRefreshToken {
  user_id: UserID;
  device_id: string;
  refreshToken: string;
}
