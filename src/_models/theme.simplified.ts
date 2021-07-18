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
  primaryAlertSuccessColor?: string;
  secondaryAlertSuccessColor?: string;
  tertiaryAlertSuccessColor?: string;
  primaryAlertWarningColor?: string;
  secondaryAlertWarningColor?: string;
  tertiaryAlertWarningColor?: string;
  primaryAlertDangerColor?: string;
  secondaryAlertDangerColor?: string;
  tertiaryAlertDangerColor?: string;
  primaryAlertPrimaryColor?: string;
  secondaryAlertPrimaryColor?: string;
  tertiaryAlertPrimaryColor?: string;
}
