import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchBoxComponent } from './search-box.component';
import { provideRouter } from '@angular/router/testing';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on search', async () => {
    spyOn(router, 'navigate');
    component.searchForm.setValue({ query: 'test' });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/search-results'], { queryParams: { query: 'test' } });
  });
});



