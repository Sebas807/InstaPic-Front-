import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchQuery = this.searchForm.get('query')?.value;
      this.router.navigate(['/search-results'], { queryParams: { query: searchQuery } });
    }
  }
}

