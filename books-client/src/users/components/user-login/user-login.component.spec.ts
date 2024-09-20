import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { UtilsModule } from '../../../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports:[UtilsModule,FormsModule,RouterModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have email, password text boxes and login button', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const loginButton = fixture.nativeElement.querySelector('#login');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });
});
