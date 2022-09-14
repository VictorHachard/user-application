import {Component} from '@angular/core';
import {AlertManager} from "../../../../../../_helpers/alert.manager";
import {HtmlTextHistory} from "../../../../../../_models/html.text.history";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Editor} from "ngx-editor";
import {Toolbar} from "ngx-editor/lib/types";
import {ActivatedRoute, Router} from "@angular/router";
import {HtmlTextHistoryService} from "../../../../../../_services/_api/html.text.history.service";

@Component({
  selector: 'app-setting-privacy',
  templateUrl: './setting-privacy.component.html',
  styleUrls: ['./setting-privacy.component.scss']
})
export class SettingPrivacyComponent {

  //https://stackblitz.com/edit/ngx-editor
  /*toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];*/

  private htmlTextHistory!: HtmlTextHistory;
  alertManagerManager: AlertManager = new AlertManager();
  updatePrivacyForm!: UntypedFormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline"],
    ["blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    [],
    [],
    []
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private htmlTextHistoryService: HtmlTextHistoryService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.htmlTextHistoryService.getAllDto('name', 'privacy').subscribe(value => {
      this.htmlTextHistory = value[0];
      this.editor = new Editor();
      this.updatePrivacyForm = new UntypedFormGroup({
        html: new UntypedFormControl(value[0].htmlHistory![0].htmlContent, Validators.required)
      });
      console.log(value)
    });
  }

  // make sure to destroy the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get f() { return this.updatePrivacyForm.controls; }

  update(): void {
    console.log(this.htmlTextHistory)
    this.htmlTextHistoryService.add({htmlContent: this.f.html.value}, this.htmlTextHistory.id!).subscribe(value => {
      this.alertManagerManager.addAlertIcon('privacy');
      this.ngOnInit();
    });
  }

}
