import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-setting-laws',
  templateUrl: './setting-laws.component.html',
  styleUrls: ['./setting-laws.component.scss']
})
export class SettingLawsComponent {

  param2!: string | null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {this.ngOnInit();});
  }

  ngOnInit(): void {
    this.param2 = this.route.snapshot.paramMap.get('param2');
  }

}
