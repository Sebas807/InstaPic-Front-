import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.performSearch();
    });
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.authService.searchByName(this.searchQuery).subscribe({
        next: results => this.searchResults = results,
        error: err => console.error('Search failed', err)
      });
    }
  }
}


