import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { AuthenticationService} from '../../services/authentication.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {By} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let mockAuthenticationService: any;
  class MockAuthenticationService {
    userData;
    SignIn(email, password) { }
  }
  let mockRouter: any;
  class MockRouter {
    //noinspection TypeScriptUnresolvedFunction
    navigate = jasmine.createSpy('navigate');
    navigateByUrl(url: string) { return url; }
  }
  beforeEach(async(() => {
    mockAuthenticationService = new MockAuthenticationService();
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ LoginComponent ],
      providers: [ { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.contactForm.controls.email.setValue('');
    component.contactForm.controls.password.setValue('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createForm' , () => {
    spyOn(component, 'setupLoginForm');
    component.ngOnInit();
    expect(component.setupLoginForm).toHaveBeenCalledTimes(1);
  });

  it('shouldn\'t call onSubmit function as long it is disabled and should call it otherwise' , () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('#signInBtn')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should call onSubmit', () => {
    expect(component.onSubmit).toBeTruthy();
  });

  it('shouldn\'t call signIn function as long it is disabled and should call it otherwise' , () => {
    spyOn(component, 'signIn');
    el = fixture.debugElement.query(By.css('#signInBtn')).nativeElement;
    el.click();
    expect(component.signIn).toHaveBeenCalledTimes(0);
    component.contactForm.controls.email.setValue('sample@password.com');
    component.contactForm.controls.password.setValue('samplePsw');
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#signInBtn')).nativeElement;
    el.click();
    expect(component.signIn).toHaveBeenCalledTimes(1);
  });


  it(`form should be invalid`, async(() => {
    component.contactForm.controls.email.setValue('');
    component.contactForm.controls.password.setValue('');
    expect(component.contactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.contactForm.controls.email.setValue('sample@mail.com');
    component.contactForm.controls.password.setValue('samplepsw');
    expect(component.contactForm.valid).toBeTruthy();
  }));

  it('should call callResetPassword', async(() => {
    spyOn(component, 'callResetPassword');
    const createButton = fixture.debugElement.query(By.css('#resetPswBtn'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.callResetPassword).toHaveBeenCalled();
  }));

  it('should create label contain "email"', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#labelE')).nativeElement.innerText).toEqual('Email');
  });

  it('should create label contain "password', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#labelPSW')).nativeElement.innerText).toEqual('Password');
  });

  it('should create input-email empty', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#email')).nativeElement.innerText).toEqual('');
  });

  it('should create input-psw empty', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#password')).nativeElement.innerText).toEqual('');
  });

  /*it('Should log in and navigate to dashboard', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateToContentPanel();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/Content-panel');
  }));*/

  it('Should navigate to reset password', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.callResetPassword();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/Reset');
  }));

  it('should run #onSubmit()', async () => {
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });
});

