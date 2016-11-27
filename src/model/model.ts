export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Town {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  sys: Sys;
}

export interface CityWeather {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
}

export interface WeatherData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: Rain;
  snow: Snow;
  sys: Sys2;
  dt_txt: string;
}

export class Rain {
  public get h3(): number {
    return this['3h'];
  }
  public set h3(val: number) {
    this['3h'] = val;
  }
}

export class Snow {
  public get h3(): number {
    return this['3h'];
  }
  public set h3(val: number) {
    this['3h'] = val;
  }
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys2 {
  pod: string;
}