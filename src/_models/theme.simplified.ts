import {AbstractModel} from "./commons/abstract.model";

export class ThemeSimplified extends AbstractModel {
  name?: string;
  image?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
}
