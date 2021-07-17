import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingLawsComponent} from './setting-laws.component';

describe('SettingLawsComponent', () => {
  let component: SettingLawsComponent;
  let fixture: ComponentFixture<SettingLawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
