import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { FullCalendarModule } from '@fullcalendar/angular'; // Módulo de FullCalendar

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  standalone: true, // Declarar el componente como standalone
  imports: [CommonModule, FormsModule, FullCalendarModule],
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [], // Se llenará dinámicamente desde el backend
  };

  fechaInicio: string = '';
  fechaFin: string = '';
  resumenEventos = {
    pendientes: 0,
    confirmados: 0,
    rechazados: 0,
  };

  isLoading = false; // Indicador de carga
  errorMessage = ''; // Mensaje de error

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.actualizarResumenEventos();
  }

  cargarEventos(): void {
    this.isLoading = true;
    this.apiService
      .getEventosFullCalendar()
      .then((events) => {
        this.calendarOptions.events = events; // Asignar eventos al calendario
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error al cargar eventos:', error);
        this.errorMessage = 'No se pudieron cargar los eventos. Por favor, inténtalo más tarde.';
        this.isLoading = false;
      });
  }
  

  filtrarEventosPorRango(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMessage = 'Por favor, selecciona ambas fechas para filtrar.';
      return;
    }

    if (new Date(this.fechaInicio) > new Date(this.fechaFin)) {
      this.errorMessage = 'La fecha de inicio no puede ser posterior a la fecha de fin.';
      return;
    }

    this.isLoading = true;
    this.apiService
      .getEventosPorRango(this.fechaInicio, this.fechaFin)
      .then((events) => {
        this.calendarOptions.events = events; // Actualizar eventos filtrados
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error al filtrar eventos:', error);
        this.errorMessage = 'Error al filtrar eventos. Por favor, intenta nuevamente.';
        this.isLoading = false;
      });
  }

  actualizarResumenEventos(): void {
    this.apiService
      .contarEventosPorEstado()
      .then((resumen) => {
        const estadosMapeados = {
          pendientes: 0,
          confirmados: 0,
          rechazados: 0,
        };

        resumen.forEach((item: any) => {
          if (item.estado === 'pendiente') {
            estadosMapeados.pendientes = item.count;
          } else if (item.estado === 'confirmado') {
            estadosMapeados.confirmados = item.count;
          } else if (item.estado === 'rechazado') {
            estadosMapeados.rechazados = item.count;
          }
        });

        this.resumenEventos = estadosMapeados;
      })
      .catch((error) => {
        console.error('Error al obtener resumen de eventos:', error);
        this.errorMessage = 'Error al obtener el resumen de eventos. Por favor, intenta nuevamente.';
      });
  }
}
