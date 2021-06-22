import {AbstractModel} from "./commons/abstract.model";
import {ThemeSimplified} from "./theme.simplified";
import {Email} from "./email";
import {Group} from "./group";
import {Role} from "./role";

export class UserSecurity extends AbstractModel {
  username?: string;
  nameFormatted?: string;
  authToken?: string;
  privacy?: string;
  birth?: Date;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  url?: string;
  biography?: string;
  themeSimplifiedDto?: ThemeSimplified;
  emailList?: Email[];
  groupDtoList?: Group[];
  roleDtoList?: Role[];
  profileImage?: string;
  emailPreferences?: string;
}
