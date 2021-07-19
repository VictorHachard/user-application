import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-setting-cookies',
  templateUrl: './setting-cookies.component.html',
  styleUrls: ['./setting-cookies.component.scss']
})
export class SettingCookiesComponent {

  param2!: string | null;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {this.ngOnInit();});
  }

  ngOnInit(): void {
    this.param2 = this.route.snapshot.paramMap.get('param2');
  }

  refresh($event: boolean): void {
    this.isSummited.emit(true);
  }

}
