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
import { MembershipComponent } from './membership/membership.component'
import { EditMembershipComponent } from './membership/editMembership/editMembership.component'
import { AddMembershipComponent } from './membership/addMembership/addMembership.component'
import { PublisherComponent } from './publisher/publisher.component'
import { EditPublisherComponent } from './publisher/editPublisher/editPublisher.component'
import { AddPublisherComponent } from './publisher/addPublisher/addPublisher.component'
import { BookComponent } from './book/book.component'
import { AddBookComponent } from './book/addBook/addBook.component'
import { EditBookComponent } from './book/editBook/editBook.component'
import { LoansComponent } from './loans/loans.component'
import { AddLoansComponent } from './loans/addLoans/addLoans.component'
import { DamageComponent } from './damage/damage.component'
import { EditLoansComponent } from './loans/editLoans/editLoans.component'
import { AddDamageComponent } from './damage/addDamage/addDamage.component'
import { EditDamageComponent } from './damage/editDamage/editDamage.component'
import { AllMembershipComponent } from './membership/allMembership.component'
import { AllDamageComponent } from './damage/allDamage.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'addAuthor', component: AddAuthorComponent },
  { path: 'editAuthor/:author_id', component: EditAuthorComponent },
  { path: 'genre', component: GenreComponent },
  { path: 'addGenre', component: AddGenreComponent },
  { path: 'editGenre/:genre_id', component: EditGenreComponent },
  { path: 'member', component: MemberComponent },
  { path: 'addMember', component: AddMemberComponent },
  { path: 'editMember/:member_id', component: EditMemberComponent },
  { path: 'membership/:member_id', component: MembershipComponent },
  { path: 'editMembership/:membership_id/:member_id', component: EditMembershipComponent },
  { path: 'addMembership/:member_id', component: AddMembershipComponent },
  { path: 'membership', component: AllMembershipComponent },
  { path: 'publisher', component: PublisherComponent },
  { path: 'editPublisher/:publisher_id', component: EditPublisherComponent },
  { path: 'addPublisher', component: AddPublisherComponent },
  { path: 'book', component: BookComponent },
  { path: 'addBook', component: AddBookComponent },
  { path: 'editBook/:book_id', component: EditBookComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'addLoans', component: AddLoansComponent },
  { path: 'editLoans/:loans_id', component: EditLoansComponent },
  { path: 'damage/:loans_id', component: DamageComponent },
  { path: 'addDamage/:loans_id', component: AddDamageComponent},
  { path: 'editDamage/:damage_id/:loans_id', component: EditDamageComponent },
  { path: 'damage', component: AllDamageComponent},

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
    AddMemberComponent,
    MembershipComponent,
    EditMembershipComponent,
    AddMembershipComponent,
    AllMembershipComponent,
    PublisherComponent,
    EditPublisherComponent,
    AddPublisherComponent,
    BookComponent,
    AddBookComponent,
    EditBookComponent,
    LoansComponent,
    AddLoansComponent,
    EditLoansComponent,
    DamageComponent,
    AddDamageComponent,
    EditDamageComponent,
    AllDamageComponent
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
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,

    }),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
