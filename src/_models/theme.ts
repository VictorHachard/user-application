import {AbstractModel} from "./commons/abstract.model";

export class Theme extends AbstractModel {
  name?: string;
  active?: boolean;
  order?: number;
  image?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
}
