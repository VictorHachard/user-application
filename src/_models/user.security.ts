import {AbstractModel} from "./commons/abstract.model";
import {ThemeSimplified} from "./theme.simplified";
import {Email} from "./email";
import {Group} from "./group";
import {Role} from "./role";

export class UserSecurity extends AbstractModel {
  username?: string;
  authToken?: string;
  privacy?: string;
  birth?: Date;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  url?: string;
  biography?: string;
  themeSimplified?: ThemeSimplified;
  emailList?: Email[];
  groupDtoList?: Group[];
  roleDtoList?: Role[];
}
