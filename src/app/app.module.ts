import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './profile/user/user.component';
import { FeedComponent } from './profile/feed/feed.component';
import { CommentComponent } from './profile/comment/comment.component';
import { GaleriaComponent } from './profile/galeria/galeria.component';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { SearchBoxComponent } from './header/components/search-box/search-box.component';
import { SearchResultComponent } from './header/components/search-result/search-result.component';
import { UserAndFeedComponent } from './profile/user-and-feed/user-and-feed.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    FeedComponent,
    CommentComponent,
    GaleriaComponent,
    RegisterComponent,
    LoginComponent,
    SearchBoxComponent,
    SearchResultComponent,
    UserAndFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
