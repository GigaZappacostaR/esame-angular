// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Importa HttpClient e withFetch
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule e ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { ListClientComponent } from './list-client/list-client.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ListClientComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, // Aggiungi FormsModule qui
    ReactiveFormsModule, // Aggiungi ReactiveFormsModule
    AppRoutingModule 
  ],
  providers: [
    provideHttpClient(withFetch()), // Configura HttpClient con fetch
  ], 
  bootstrap: [AppComponent] 
})
export class AppModule { }