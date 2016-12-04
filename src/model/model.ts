interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Town {
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

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  sys: Sys;
}

interface CityWeather {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
}

interface WeatherData {
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

class Rain {
  public get h3(): number {
    return this['3h'];
  }
  public set h3(val: number) {
    this['3h'] = val;
  }
}

class Snow {
  public get h3(): number {
    return this['3h'];
  }
  public set h3(val: number) {
    this['3h'] = val;
  }
}

interface Wind {
  speed: number;
  deg: number;
}

interface Sys2 {
  pod: string;
}

interface weatherResponce<T>{
  count: number;
  list: T[];
}