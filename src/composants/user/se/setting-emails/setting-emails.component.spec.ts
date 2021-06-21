import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingEmailsComponent} from './setting-emails.component';

describe('SettingEmailsComponent', () => {
  let component: SettingEmailsComponent;
  let fixture: ComponentFixture<SettingEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingEmailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
