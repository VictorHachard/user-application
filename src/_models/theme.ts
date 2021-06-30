import {AbstractModel} from "./commons/abstract.model";
import {SafeHtml} from "@angular/platform-browser";

export class Theme extends AbstractModel {
  name?: string;
  active?: boolean;
  order?: number;
  image?: string | SafeHtml;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
}
