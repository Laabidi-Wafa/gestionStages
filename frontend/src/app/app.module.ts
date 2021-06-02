import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormationsComponent } from './components/formations/formations.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { Error404Component } from './components/error404/error404.component';
import { SurveyComponent } from './components/survey/survey.component';
import { CreateFormationComponent } from './components/create-formation/create-formation.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DetailsFormationsComponent } from './components/details-formations/details-formations.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    FormationsComponent,
    HomeComponent,
    AdminHomeComponent,
    Error404Component,
    SurveyComponent,
    CreateFormationComponent,
    DetailsFormationsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
