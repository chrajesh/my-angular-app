import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private directUrl = 'https://weather-forecast-test-h9dmckhmfuaqexey.canadacentral-01.azurewebsites.net/weather/allForecastTypes';

  constructor(private http: HttpClient) { }

  getAllForecastTypes(): Observable<WeatherForecast[]> {
    console.log('???  Fetching weather data from Azure API...');
    
    return this.http.get<WeatherForecast[]>(this.directUrl);
  }
}
