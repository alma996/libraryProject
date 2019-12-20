import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { AuthorComponent } from './author/author.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { NgxPaginationModule } from 'ngx-pagination'
import {AddAuthorComponent} from './author/addAuthor/addAuthor.component';
import {EditAuthorComponent} from './author/editAuthor/editAuthor.component';
import { GenreComponent } from './genre/genre.component';
import { AddGenreComponent } from './genre/addGenre/addGenre.component';
import { EditGenreComponent } from './genre/editGenre/editGenre.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './member/addMember/addMember.component';
import { EditMemberComponent } from './member/editMember/editMember.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'addAuthor', component: AddAuthorComponent },
  { path: 'editAuthor/:author_id/:first_name/:last_name', component: EditAuthorComponent },
  { path: 'genre', component: GenreComponent },
  { path: 'addGenre', component: AddGenreComponent },
  { path: 'editGenre/:genre_id/:genre_name', component: EditGenreComponent },
  { path: 'member', component: MemberComponent },
  { path: 'addMember', component: AddMemberComponent },
  { path: 'editMember/:member_id/:first_name/:last_name/:birth_date/:address/:email/:phone_number', component: EditMemberComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthorComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    GenreComponent,
    AddGenreComponent,
    EditGenreComponent,
    MemberComponent,
    EditMemberComponent,
    AddMemberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
