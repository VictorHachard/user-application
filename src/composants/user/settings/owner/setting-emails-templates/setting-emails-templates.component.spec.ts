import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEmailsTemplatesComponent } from './setting-emails-templates.component';

describe('SettingEmailsTemplatesComponent', () => {
  let component: SettingEmailsTemplatesComponent;
  let fixture: ComponentFixture<SettingEmailsTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingEmailsTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEmailsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
