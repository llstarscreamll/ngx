import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorsComponent } from './api-errors.component';

describe('ApiErrorsComponent', () => {
  let component: ApiErrorsComponent;
  let fixture: ComponentFixture<ApiErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render errors container if apiError is falsy', () => {
    component.apiError = null;

    fixture.detectChanges();
    let template: HTMLElement = fixture.debugElement.nativeElement;

    expect(template.querySelector('.errors-container')).toBeFalsy();
  });

  it('should show errors container if apiError is truthy', () => {
    component.apiError = { message: 'http request failure', ok: false };

    fixture.detectChanges();
    let template: HTMLElement = fixture.debugElement.nativeElement;

    expect(template.querySelector('.errors-container')).toBeTruthy();
  });

  it('should show top level message text if specific error message is null', () => {
    let apiError = { message: 'http request failure', ok: false };
    component.apiError = apiError;

    fixture.detectChanges();
    let template: HTMLElement = fixture.debugElement.nativeElement;

    expect(template.querySelector('.errors-container').textContent).toContain(apiError.message);
  });

  it('should show specific error message if exists', () => {
    let apiError = {
      message: 'http request failure',
      ok: false,
      error: { message: 'something went wrong' }
    };
    component.apiError = apiError;

    fixture.detectChanges();
    let template: HTMLElement = fixture.debugElement.nativeElement;

    expect(template.querySelector('.errors-container').textContent).toContain(apiError.error.message);
  });

  it('should render list with validation errors if exists', () => {
    let apiError = {
      message: 'http request failure',
      ok: false,
      error: {
        message: 'something went wrong',
        errors: {
          email: [
            'email is too short',
            'email has invalid format',
          ]
        }
      }
    };
    component.apiError = apiError;

    fixture.detectChanges();
    let template: HTMLElement = fixture.debugElement.nativeElement;
    let emailErrors = apiError.error.errors.email;

    expect(template.querySelector('.errors-container ul').textContent).toContain(emailErrors[0]);
    expect(template.querySelector('.errors-container ul').textContent).toContain(emailErrors[1]);
  });
});
