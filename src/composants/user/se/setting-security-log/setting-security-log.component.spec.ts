import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingSecurityLogComponent} from './setting-security-log.component';

describe('SettingSecurityLogComponent', () => {
  let component: SettingSecurityLogComponent;
  let fixture: ComponentFixture<SettingSecurityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingSecurityLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSecurityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
