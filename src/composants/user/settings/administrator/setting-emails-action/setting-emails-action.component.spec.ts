import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEmailsActionComponent } from './setting-emails-action.component';

describe('SettingEmailsActionComponent', () => {
  let component: SettingEmailsActionComponent;
  let fixture: ComponentFixture<SettingEmailsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingEmailsActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEmailsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
