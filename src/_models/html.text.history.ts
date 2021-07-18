import {AbstractModel} from "./commons/abstract.model";
import {HtmlText} from "./html.text";

export class HtmlTextHistory extends AbstractModel {
  name?: string;
  htmlHistory?: HtmlText[];
}
