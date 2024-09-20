import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  
  let authServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  //let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    //activatedRouteStub = new ActivatedRouteStub(); // Mock ActivatedRoute
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        //{ provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message in div in case of login failure', () => {
    // Mock failed login response from service
    //authServiceSpy.login.and.returnValue(of({ success: false }));
    authServiceSpy.login.and.returnValue(throwError(()=>({ status: 401 })));

    // component.email = 'test@example.com';
    // component.password = 'wrongpassword';
    
    // // Simulate form submission
    // const form = fixture.nativeElement.querySelector('form');
    // form.dispatchEvent(new Event('submit'));
    
    // fixture.detectChanges();

    // // Check for error message
    // const errorMessage = fixture.nativeElement.querySelector('div');
    // expect(errorMessage.textContent).toContain('Invalid credentials');
  });

  it('should redirect to "/" in case of login success and no returnPath given', () => {
    // Mock successful login response
    // authServiceSpy.login.and.returnValue(of({ success: true }));

    // component.email = 'test@example.com';
    // component.password = 'correctpassword';

    // // Ensure no returnpath is given in ActivatedRoute query params
    // activatedRouteStub.setQueryParams({});

    // // Simulate form submission
    // const form = fixture.nativeElement.querySelector('form');
    // form.dispatchEvent(new Event('submit'));

    // fixture.detectChanges();

    // // Check if the default redirect to "/home" was called
    // expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should redirect to "?returnPath=/dashboard" if returnPath is provided', () => {
    // Mock successful login response
    // authServiceSpy.login.and.returnValue(of({ success: true }));

    // component.email = 'test@example.com';
    // component.password = 'correctpassword';

    // // Simulate returnpath in the query parameter
    // activatedRouteStub.setQueryParams({ returnpath: '/dashboard' });

    // // Simulate form submission
    // const form = fixture.nativeElement.querySelector('form');
    // form.dispatchEvent(new Event('submit'));

    // fixture.detectChanges();

    // // Check if the redirect to "/dashboard" was called
    // expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an error message when the login service fails (HTTP error)', () => {
    // Mock HTTP error from login service
  //   authServiceSpy.login.and.returnValue(throwError({ status: 500 }));

  //   component.email = 'test@example.com';
  //   component.password = 'correctpassword';

  //   // Simulate form submission
  //   const form = fixture.nativeElement.querySelector('form');
  //   form.dispatchEvent(new Event('submit'));

  //   fixture.detectChanges();

  //   // Check for generic error message
  //   const errorMessage = fixture.nativeElement.querySelector('div');
  //   expect(errorMessage.textContent).toContain('An error occurred');
   });
});
