import {AbstractModel} from "./commons/abstract.model";

export class SessionSimplified extends AbstractModel {
  ip?: string;
  lastConnection?: Date;
  userAgent?: string;
  platform?: string;
}
