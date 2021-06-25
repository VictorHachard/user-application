import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingBlockedUsersComponent} from './setting-blocked-users.component';

describe('SettingBlockedUsersComponent', () => {
  let component: SettingBlockedUsersComponent;
  let fixture: ComponentFixture<SettingBlockedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBlockedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
