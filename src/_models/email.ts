import {AbstractModel} from "./commons/abstract.model";

export class Email extends AbstractModel {
  email?: string;
  priority?: string;
  privacy?: string;
  confirmed?: boolean;
  backup?: boolean;
}
