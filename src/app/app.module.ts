import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';





//rutas
import { APP_ROUTES } from './app-routing.module';
// import { AppRoutingModule } from './app-routing.module';

//servicios
import { ServiceModule } from './services/service.module';


///modulos
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    

  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
