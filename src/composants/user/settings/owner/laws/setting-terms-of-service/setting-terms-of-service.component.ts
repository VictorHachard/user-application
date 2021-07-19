import {Component, OnDestroy} from '@angular/core';
import {AlertManager} from "../../../../../../_helpers/alert.manager";
import {ActivatedRoute, Router} from "@angular/router";
import {Editor} from "ngx-editor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Toolbar} from "ngx-editor/lib/types";
import {HtmlTextHistoryService} from "../../../../../../_services/_api/html.text.history.service";
import {HtmlTextHistory} from "../../../../../../_models/html.text.history";

@Component({
  selector: 'app-setting-terms-of-service',
  templateUrl: './setting-terms-of-service.component.html',
  styleUrls: ['./setting-terms-of-service.component.scss']
})
export class SettingTermsOfServiceComponent implements OnDestroy {

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
  updateTermsForm!: FormGroup;
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
    this.htmlTextHistoryService.getAllDto('name', 'terms').subscribe(value => {
      this.htmlTextHistory = value[0];
      this.editor = new Editor();
      this.updateTermsForm = new FormGroup({
        html: new FormControl(value[0].htmlHistory![0].htmlContent, Validators.required)
      });
    });
  }

  // make sure to destroy the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get f() { return this.updateTermsForm.controls; }

  update(): void {
    console.log(this.htmlTextHistory)
    this.htmlTextHistoryService.add({htmlContent: this.f.html.value}, this.htmlTextHistory.id!).subscribe(value => {
      this.alertManagerManager.addAlertIcon('terms');
      this.ngOnInit();
    });
  }

}
