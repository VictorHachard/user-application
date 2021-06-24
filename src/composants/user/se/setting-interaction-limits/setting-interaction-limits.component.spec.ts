import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingInteractionLimitsComponent} from './setting-interaction-limits.component';

describe('SettingInteractionLimitsComponent', () => {
  let component: SettingInteractionLimitsComponent;
  let fixture: ComponentFixture<SettingInteractionLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingInteractionLimitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInteractionLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
