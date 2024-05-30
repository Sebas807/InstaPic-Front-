import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './profile/galeria/galeria.component';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { SearchBoxComponent } from './header/components/search-box/search-box.component';
import { SearchResultComponent } from './header/components/search-result/search-result.component';
import { UserAndFeedComponent } from './profile/user-and-feed/user-and-feed.component';





const routes: Routes = [
  { 
    path: 'galeria', 
    component: GaleriaComponent 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'search-results', 
    component: SearchResultComponent 
  },
  { 
    path: '', 
    component: UserAndFeedComponent, 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
