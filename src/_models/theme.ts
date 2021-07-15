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
  primaryAlertSuccessColor?: string;
  secondaryAlertSuccessColor?: string;
  tertiaryAlertSuccessColor?: string;
  primaryAlertWarningColor?: string;
  secondaryAlertWarningColor?: string;
  tertiaryAlertWarningColor?: string;
  primaryAlertDangerColor?: string;
  secondaryAlertDangerColor?: string;
  tertiaryAlertDangerColor?: string;
}
