import { IBaseRepository, BaseRepository } from './base-repository';

export interface IWeatherRepository extends IBaseRepository {
  getCurrentloaction(pos: Coord, callback: (data: weatherResponce<Town>) => void): void;
  getNearestLocations(pos: Coord, count: number, callback: (data: weatherResponce<Town>) => void): void
}

export class WeatherRepository extends BaseRepository implements IWeatherRepository {
  public getCurrentloaction(pos: Coord, callback: (data: weatherResponce<Town>) => void): void {
    let url = this.weatherUrl(`data/2.5/find?lat=${pos.lat}&lon=${pos.lon}`);
    this.http.request('GET', url, callback);
  }

  public getNearestLocations(pos: Coord, count: number, callback: (data: weatherResponce<Town>) => void): void {
    let url = this.weatherUrl(`data/2.5/find?lat=${pos.lat}&lon=${pos.lon}&cnt=${count}`);
    this.http.request('GET', url, callback);
  }
}
