import { ShowDetailsComponent } from './showdetails/showdetails.component';
import { RegisterComponent } from './register/register.component';
import { BookMyShowAuthGuard } from './bookmyshow.authguard';
import { LoginComponent } from './login/login.component';
import { ShowDetailsCardComponent } from './show-details-card/show-details-card.component';
import { MainRouting } from './bookmyshow.routing';
import { BookMyShowComponent } from './bookmyshow.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeatSelectorComponent } from './seat-selector/seat-selector.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    BookMyShowComponent,
    ShowDetailsCardComponent,
    LoginComponent,
    RegisterComponent,
    ShowDetailsComponent,
    SeatSelectorComponent
  ],
  imports: [
    CommonModule,
    MainRouting,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HomepageComponent,
    BookMyShowComponent,
    ShowDetailsCardComponent,
    LoginComponent,
    RegisterComponent,
    ShowDetailsComponent,
    SeatSelectorComponent
  ],
  providers: [BookMyShowAuthGuard]
})
export class BookMyShowModule { }
