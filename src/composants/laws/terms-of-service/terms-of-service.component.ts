import {Component, OnInit} from '@angular/core';
import {HtmlTextHistoryService} from "../../../_services/_api/html.text.history.service";
import {HtmlTextHistory} from "../../../_models/html.text.history";
import {HtmlText} from "../../../_models/html.text";

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {

  htmlHistory!: HtmlTextHistory[];
  htmlText!: HtmlText;

  constructor(private htmlTextHistoryService: HtmlTextHistoryService) { }

  ngOnInit(): void {
    this.htmlTextHistoryService.getAllDto('name', 'terms').subscribe(value => {
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
