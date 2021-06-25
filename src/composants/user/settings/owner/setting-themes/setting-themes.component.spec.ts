import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingThemesComponent} from './setting-themes.component';

describe('SettingThemesComponent', () => {
  let component: SettingThemesComponent;
  let fixture: ComponentFixture<SettingThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
