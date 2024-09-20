import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';


describe('UserRegistrationComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(async () => {

    userServiceSpy= jasmine.createSpyObj('UserService',['login']);

    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports:[FormsModule],
      providers:[{
        provide: UserService,
        useValue: userServiceSpy
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have email,password and login button controls',()=>{

    //get a reference to email control

    const email = fixture.nativeElement.querySelector("#email");   
    expect(email).toBeTruthy(); 
  })

  it('should set message to invalid email in case email is not supplied',()=>{

    component.handleLogin();

    expect(component.error).toEqual("Missing Email");

  });

  
  it('should set message to invalid password in case email is supplied but password is not supplied',()=>{

    component.email="something@email.com";
    component.handleLogin();
    expect(userServiceSpy.login).not.toHaveBeenCalled();
    expect(component.error).toEqual("Missing Password");

  });

  it('Should return invalid credentials for wrong email password combination',()=>{

    component.email="something@email.com";
    component.password="invalidpassword";
    userServiceSpy.login.and.returnValue(undefined);

    component.handleLogin();

    expect(userServiceSpy.login).toHaveBeenCalledTimes(1);

    expect(component.error).toEqual("Invalid Credentials");

  });

  it('Should return success for valid credentials',()=>{

    component.email="vivek@gmail.com";
    component.password="pass#1";

    const fakeUser={name:'Someone',email:component.email,photo:"",roles:[],password:''};

    userServiceSpy.login.and.returnValue(fakeUser);
    component.handleLogin();


    expect(component.error).toEqual("");
    expect(component.success).toContain("Welcome");
    expect(component.success).toContain(fakeUser.name);

  });

  


  

});
