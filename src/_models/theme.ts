import {AbstractModel} from "./commons/abstract.model";

export class Theme extends AbstractModel {
  name?: string;
  active?: boolean;
  order?: number;
}
