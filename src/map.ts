import { IWeatherRepository, WeatherRepository } from './repository/weather-repository';

export class map {

  private static _instance: map;
  public static getInstance(): map {
    if (!map._instance) {
      map._instance = new map();
      map._instance.weatherRepository = new WeatherRepository();
    }
    return map._instance;
  }

  private static CountTowns: number = 50;

  private static status: HTMLElement;

  public static initMap() {
    map.status = document.getElementById('status');
    map.status.innerText = "Start loading...";
    let googleMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 13
    });
    let infoWindow: InfoWindow = new google.maps.InfoWindow({ map: googleMap });
    let instance = map.getInstance();
    instance.infoWindow = infoWindow;
    instance.map = googleMap;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => instance.drawContent(pos)
        , () => instance.handleLocationError(true, infoWindow, googleMap.getCenter())
      );
    } else {
      // Browser doesn't support Geolocation
      instance.handleLocationError(false, infoWindow, googleMap.getCenter());
    }
  }

  public infoWindow: InfoWindow;
  public map: any;
  private weatherRepository: IWeatherRepository;

  private drawContent = (position: any) => {
    let lat: number = parseFloat(parseFloat(position.coords.latitude).toFixed(2));
    let lng: number = parseFloat(parseFloat(position.coords.longitude).toFixed(2));

    let pos: coordGoogle = {
      lat: lat,
      lng: lng
    };

    let coord: Coord = <Coord>{ lat: pos.lat, lon: pos.lng };
    this.weatherRepository.getCurrentloaction(coord, this.currentlocationCallback.bind(this, pos));
  }

  private currentlocationCallback(pos: coordGoogle, data: weatherResponce<Town>): void {
    map.status.innerText = "Loaded current position. Start to load other...";
    let first: Town = data.list[0];
    let content: string = `Location ${first.name}: ${first.main.temp}`;
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(content);

    this.map.setCenter(pos);

    let coord: Coord = <Coord>{ lat: pos.lat, lon: pos.lng };

    this.weatherRepository.getNearestLocations(coord, map.CountTowns, this.nearestLocationsCallback.bind(this, pos));
  }

  private nearestLocationsCallback(pos: coordGoogle, data: weatherResponce<Town>): void {
    map.status.innerText = "Initialize other towns...";
    let gradus = '°';
    let element: Town = null;
    for (let i = data.count - 1; i > 0; i--) {
      element = data.list[i];
      let infoWindow: InfoWindow = new google.maps.InfoWindow({ map: this.map });
      infoWindow.setPosition({ lat: element.coord.lat, lng: element.coord.lon });
      infoWindow.setContent(`${element.name}: ${element.main.temp}${gradus}`);
    }
    this.turnOffLoader();
  }

  private turnOffLoader(): void {
    map.status.remove();
    let spinners = document.getElementsByClassName('spinner');
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].remove();
    }
    document.getElementById('map').className = "loaded";
  }

  private handleLocationError(browserHasGeolocation: boolean, infoWindow: InfoWindow, pos: coordGoogle) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}

