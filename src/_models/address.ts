import {AbstractModel} from "./commons/abstract.model";
import {Country} from "./country";

export class Address extends AbstractModel {
  alias?: string;
  name?: string;
  building?: string;
  street?: string;
  postcode?: string;
  countryDto?: Country;
}
