import {AbstractModel} from "./commons/abstract.model";

export class Session extends AbstractModel {
  token?: string;
  authToken?: string;
  ip?: string;
  lastConnection?: Date;
  onMobile?: boolean;
  userAgent?: string;
  platform?: string;
}
