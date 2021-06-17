import {AbstractModel} from "./commons/abstract.model";

export class Group extends AbstractModel {
  name?: string;
  active?: boolean;
  order?: number;
}
