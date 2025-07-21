import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Rajesh Chaganti - Angular Developer';
  weatherData: WeatherForecast[] = [];
  loading = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.loading = true;
    this.error = null;
    
    this.weatherService.getAllForecastTypes().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
        console.log('Weather data loaded successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        
        // Provide user-friendly error messages
        if (err.message && err.message.includes('Network error')) {
          this.error = 'Network error: Unable to connect to the weather service. Please check your internet connection and try again.';
        } else if (err.status === 0) {
          this.error = 'Connection failed: Unable to reach the weather service. This might be a CORS issue or network problem.';
        } else if (err.status >= 500) {
          this.error = 'Server error: The weather service is temporarily unavailable. Please try again later.';
        } else if (err.status === 404) {
          this.error = 'Service not found: The weather API endpoint is not available.';
        } else {
          this.error = `Failed to load weather data: ${err.message || 'Unknown error occurred'}`;
        }
        
        this.loading = false;
      }
    });
  }

  refreshWeatherData() {
    this.loadWeatherData();
  }
}
