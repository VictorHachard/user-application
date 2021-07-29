import {AbstractModel} from "./commons/abstract.model";

export class Setting extends AbstractModel {
  name?: string;
  active?: boolean;
  canUpdate?: boolean;
}
