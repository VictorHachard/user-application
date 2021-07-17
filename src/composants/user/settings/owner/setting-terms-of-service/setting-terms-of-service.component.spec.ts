import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingTermsOfServiceComponent} from './setting-terms-of-service.component';

describe('SettingTermsOfServiceComponent', () => {
  let component: SettingTermsOfServiceComponent;
  let fixture: ComponentFixture<SettingTermsOfServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingTermsOfServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
