import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service'; // Asegúrate de que el servicio AuthService esté importado si es necesario
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListModule } from 'primeng/orderlist';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa el módulo FullCalendar
import { CalendarioComponent } from './components/calendario/calendario.component'; // Importa tu componente CalendarioComponent


@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent, // Declara el componente CalendarioComponent aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Asegúrate de que HttpClientModule esté en los imports
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    OrderListModule,
    FullCalendarModule, // Importa FullCalendarModule aquí
  ],
  providers: [AuthService], // Si el AuthService no es un proveedor en un archivo diferente
  bootstrap: [AppComponent],
})
export class AppModule {}
