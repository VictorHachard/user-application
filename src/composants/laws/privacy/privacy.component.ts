import {Component, OnInit} from '@angular/core';
import {HtmlTextHistory} from "../../../_models/html.text.history";
import {HtmlText} from "../../../_models/html.text";
import {HtmlTextHistoryService} from "../../../_services/_api/html.text.history.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  htmlHistory!: HtmlTextHistory[];
  htmlText!: HtmlText;

  constructor(private htmlTextHistoryService: HtmlTextHistoryService) { }

  ngOnInit(): void {
    this.htmlTextHistoryService.getAllDto('name', 'privacy').subscribe(value => {
      this.htmlHistory = value[0].htmlHistory!;
      this.htmlText = value[0].htmlHistory![0];
    });
  }

  update(id: number) {
    for (let htmlText of this.htmlHistory) {
      if (htmlText.id === id) {
        this.htmlText = htmlText;
      }
    }
  }
}
