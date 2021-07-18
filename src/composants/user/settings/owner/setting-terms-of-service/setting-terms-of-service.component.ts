import {Component, OnDestroy} from '@angular/core';
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {ActivatedRoute, Router} from "@angular/router";
import {Editor} from "ngx-editor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Toolbar} from "ngx-editor/lib/types";

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
              private router: Router) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.updateTermsForm = new FormGroup({
      html: new FormControl('', Validators.required)
    });
  }

  // make sure to destroy the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get f() { return this.updateTermsForm.controls; }

  updateTerms(): void {
    console.log(this.f.html.value);
  }
}
