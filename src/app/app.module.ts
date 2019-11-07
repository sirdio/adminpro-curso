import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';





//rutas
import { APP_ROUTES } from './app-routing.module';
// import { AppRoutingModule } from './app-routing.module';



///modulos
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
