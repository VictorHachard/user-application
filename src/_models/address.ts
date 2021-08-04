import {AbstractModel} from "./commons/abstract.model";

export class Address extends AbstractModel {
  alias?: string;
  name?: string;
  building?: string;
  street?: string;
  postcode?: string;
}
