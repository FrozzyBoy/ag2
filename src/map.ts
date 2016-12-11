import {
  IWeatherRepository,
  WeatherRepository
} from './repository/weather-repository';

export class map {
  private static googleMap: any;

  private static CountTowns: number = 50;

  private static _instance: map;
  private static getInstance(): map {
    if (!map._instance) {
      map._instance = new map();
      map._instance.weatherRepository = new WeatherRepository();
      map._instance.status = document.getElementById('status');
    }
    return map._instance;
  }

  public static initMap() {
    map.getInstance().initialize();
  }

  public initialize(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: Position) => {
        this.drawMap(pos);
      })
    }
  }

  private weatherRepository: IWeatherRepository;
  private status: HTMLElement;

  private drawMap(pos: Position): void {
    this.status.textContent = "Draw map";
    let currentPos: coordGoogle = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    map.googleMap = new google.maps.Map(document.getElementById('map'), {
      center: currentPos,
      zoom: 12
    });
    this.drawWeather(map.googleMap, currentPos);
  }

  private drawWeather(googleMap: any, currentLocation: coordGoogle): void {
    this.status.textContent = "Load weather";
    let coord: Coord = <Coord>{ lat: currentLocation.lat, lon: currentLocation.lng };
    this.weatherRepository.getCurrentloaction(coord, this.drawCurrentLoacation.bind(this, googleMap));
    this.weatherRepository.getNearestLocations(coord, map.CountTowns, this.drawAllTownsWeather.bind(this, googleMap));
  }

  private drawCurrentLoacation(googleMap: any, data: weatherResponce<Town>): void {
    let current = data.list[0];
    let label = `Current location:${current.name}`;
    this.drawWindows(label, current.coord, googleMap);
  }

  private drawAllTownsWeather(googleMap: any, data: weatherResponce<Town>): void {
    this.status.textContent = "Draw weather";
    let towns: Town[] = data.list;
    let content: string = '';
    let current: Town = null;
    let gradus = '°';

    for (let i = data.count - 1; i > 0; i--) {
      current = towns[i];
      content = `${current.name}: ${current.main.temp}${gradus}C`;
      this.drawWindows(content, current.coord, googleMap);
    }

    this.status.textContent = "Complite";
  }

  private drawWindows(content: string, pos: Coord, googleMap: any): void {
    let win: InfoWindow = new google.maps.InfoWindow({ map: googleMap });
    win.setContent(content);
    win.setPosition(this.convertCoord(pos));
  }

  private convertCoord(pos: Coord): coordGoogle {
    return { lat: pos.lat, lng: pos.lon };
  }

}

