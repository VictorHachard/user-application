import {AbstractModel} from "./commons/abstract.model";
import {SessionSimplified} from "./session.simplified";

export class SecurityLog extends AbstractModel {
  securityLog?: string;
  info?: string;
  sessionSimplifiedDto?: SessionSimplified;
}
