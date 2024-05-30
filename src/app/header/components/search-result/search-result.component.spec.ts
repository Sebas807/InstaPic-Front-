import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultComponent } from './search-result.component';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['searchByName']);
    const activatedRouteStub = { queryParams: of({ query: 'test' }) };

    await TestBed.configureTestingModule({
      declarations: [ SearchResultComponent ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform search on init', () => {
    authService.searchByName.and.returnValue(of([]));
    component.ngOnInit();
    expect(authService.searchByName).toHaveBeenCalledWith('test');
  });

  it('should handle search errors', () => {
    authService.searchByName.and.returnValue(throwError('Search failed'));
    spyOn(console, 'error');
    component.performSearch();
    expect(console.error).toHaveBeenCalledWith('Search failed', 'Search failed');
  });
});
