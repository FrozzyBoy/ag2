import { IBaseRepository, BaseRepository } from './base-repository';

export interface IWeatherRepository extends IBaseRepository {
  getCurrentloaction(pos: Coord, callback: (data: weatherResponce<Town>) => void): void;
  getNearestLocations(pos: Coord, count: number, callback: (data: weatherResponce<Town>) => void): void
}

export class WeatherRepository extends BaseRepository implements IWeatherRepository {
  public getCurrentloaction(pos: Coord, callback: (data: weatherResponce<Town>) => void): void {
    this.foundTown(pos, 0, callback);
  }

  public getNearestLocations(pos: Coord, count: number, callback: (data: weatherResponce<Town>) => void): void {
    this.foundTown(pos, count, callback);
  }

  private foundTown(pos: Coord, count: number, callback: (data: weatherResponce<Town>) => void): void {
    let lat = pos.lat;
    let lon = pos.lon;
    let cnt = count;

    let url = this.weatherUrl(`data/2.5/find?lat=${lat}&lon=${lon}` + (count > 0 ? `&cnt=${count}` : ``));
    this.http.request('GET', url, callback);
  }
}
