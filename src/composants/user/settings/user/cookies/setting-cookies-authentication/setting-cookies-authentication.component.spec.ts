import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingCookiesAuthenticationComponent} from './setting-cookies-authentication.component';

describe('SettingCookiesAuthenticationComponent', () => {
  let component: SettingCookiesAuthenticationComponent;
  let fixture: ComponentFixture<SettingCookiesAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCookiesAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCookiesAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
