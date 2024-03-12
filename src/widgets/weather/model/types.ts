export interface WeatherData {
  current: {
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    last_updated_epoch: number;
    temp_c: number;
    wind_kph: number;
  };
  location: {
    country: string;
    name: string;
  };
}
