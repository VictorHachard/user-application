import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectFromCookieComponent} from './connect-from-cookie.component';

describe('Connect.From.CookieComponent', () => {
  let component: ConnectFromCookieComponent;
  let fixture: ComponentFixture<ConnectFromCookieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectFromCookieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectFromCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
