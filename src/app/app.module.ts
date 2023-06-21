import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from "./components/play/play.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizInProgressGuard } from './guards/leavePageDuringQuizGuard'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'play', component: PlayComponent, canDeactivate: [QuizInProgressGuard] },
  { path: 'results', component: ResultsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [QuizInProgressGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
