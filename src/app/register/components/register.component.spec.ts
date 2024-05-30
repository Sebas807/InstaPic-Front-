import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register on form submit', () => {
    authService.register.and.returnValue(of(true));
    component.registerForm.setValue({ name: 'test', email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(authService.register).toHaveBeenCalledWith({ name: 'test', email: 'test@test.com', password: 'password' });
  });

  it('should navigate to login on successful registration', () => {
    authService.register.and.returnValue(of(true));
    component.registerForm.setValue({ name: 'test', email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration errors', () => {
    authService.register.and.returnValue(throwError('Registration failed'));
    spyOn(console, 'error');
    component.registerForm.setValue({ name: 'test', email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(console.error).toHaveBeenCalledWith('Registration failed', 'Registration failed');
  });

  it('should not call AuthService.register if form is invalid', () => {
    component.registerForm.setValue({ name: '', email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });
});



