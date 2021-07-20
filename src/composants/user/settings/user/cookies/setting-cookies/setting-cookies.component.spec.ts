import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingCookiesComponent} from './setting-cookies.component';

describe('SettingCookiesComponent', () => {
  let component: SettingCookiesComponent;
  let fixture: ComponentFixture<SettingCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCookiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
