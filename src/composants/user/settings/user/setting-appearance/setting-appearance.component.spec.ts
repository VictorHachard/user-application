import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingAppearanceComponent} from './setting-appearance.component';

describe('SettingAppearanceComponent', () => {
  let component: SettingAppearanceComponent;
  let fixture: ComponentFixture<SettingAppearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAppearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
