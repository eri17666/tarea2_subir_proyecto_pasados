import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance: AxiosInstance;
  private baseUrl = 'http://localhost:3000';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    console.log(this.axiosInstance.defaults);
  }

  /*
    Método genérico para manejar peticiones POST
  */
  private async postRequest(endpoint: string, data: any): Promise<any[]> {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error al hacer POST a ${endpoint}:`, error);
      throw error;
    }
  }
  /*--------------USUARIOS---------------- */
  /*
    Obtener todos los usuarios desde el backend
   */
    async getUsuarios(usuario: any): Promise<any[]> {
      return this.postRequest('/usuario', usuario);
    }
    

  /*---------------EVENTOS---------------- */
  /*
    Obtener todos los eventos desde el backend
   */
    async getEventosusuarionormal(): Promise<any[]> {
      try {
        const response = await this.axiosInstance.get('/evento/eventos-Usernormal');
        console.log('Respuesta completa del servidor:', response.data);
    
        if (response.data && Array.isArray(response.data.data)) {
          return response.data.data; // Devuelve el array de eventos en la propiedad 'data'
        } else {
          console.warn('La respuesta no contiene un array de eventos');
          return [];
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        throw error;
      }
    }   
     
    async getEventoscreador(usuario: string): Promise<any[]> {
      try {
        // Realiza la solicitud POST al backend
        const response = await this.axiosInstance.post('/evento/eventos-Creador', {
          NombreCreador: usuario // El parámetro se pasa en el cuerpo, como en el @Body() del backend
        });
    
        console.log('Respuesta completa del servidor:', response.data);
    
        // Verificar que la respuesta contiene los datos esperados
        if (response.data && Array.isArray(response.data.data)) {
          return response.data.data; // Devuelve los eventos
        } else {
          console.warn('La respuesta no contiene un array de eventos');
          return [];
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        throw error;
      }
    }
    
  async getEventosadmin(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Admin');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventosfecha(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/filtrar-fecha');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }
  
  async getEventospendientes(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-pend');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  /*---------------ESPACIOS---------------- */
    /*
      Obtener todos los espacios desde el backend
     */
      async getEspacios(espacio: any): Promise<any[]> {
        return this.postRequest('/espacio', espacio);
      }

  /*---------------PETICIONES---------------- */
    /* 
       Obtener todos los peticiones desde el backend
      */
      async getPeticiones(peticiones: any): Promise<any[]> {
        return this.postRequest('/peticiones', peticiones);
      }




      async getEventosFullCalendar(): Promise<any[]> {
        try {
          const response = await this.axiosInstance.get('/evento/fullcalendar');
          return response.data; // Asegúrate de que el backend devuelva los datos correctamente formateados
        } catch (error) {
          console.error('Error al obtener eventos para FullCalendar:', error);
          throw error;
        }
      }
      
      async getEventosPorRango(fechaInicio: string, fechaFin: string): Promise<any[]> {
        try {
          const response = await this.axiosInstance.get('/evento/range', {
            params: { fechaInicio, fechaFin }, // Pasar los parámetros como query
          });
          return response.data;
        } catch (error) {
          console.error('Error al obtener eventos por rango de fechas:', error);
          throw error;
        }
      }
    
      /*
        Contar eventos por estado
      */
        async contarEventosPorEstado(): Promise<any[]> {
          try {
            const response = await this.axiosInstance.get('/evento/estado/count');
            return response.data;
          } catch (error) {
            console.error('Error al contar eventos por estado:', error);
            throw error;
          }
        }
        
        




      
}
