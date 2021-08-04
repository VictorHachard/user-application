import {AbstractModel} from "./commons/abstract.model";
import {ThemeSimplified} from "./theme.simplified";
import {Email} from "./email";
import {Group} from "./group";
import {Role} from "./role";
import {UserSecuritySimplified} from "./user.security.simplified";
import {Address} from "./address";

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
  blockedUserDtoList?: UserSecuritySimplified[];
  emailList?: Email[];
  groupDtoList?: Group[];
  roleDtoList?: Role[];
  profileImage?: string;
  emailPreferences?: string;
  twoFactorEmail?: boolean;
  addressDtoList?: Address[];
}
