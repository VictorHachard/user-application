import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingUserSettingsComponent} from './setting-user-settings.component';

describe('SettingUserSettingsComponent', () => {
  let component: SettingUserSettingsComponent;
  let fixture: ComponentFixture<SettingUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingUserSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
