import { Http, IHttp } from './http';

export interface IBaseRepository {
  http: IHttp;
  apiKey: string;

  weatherUrl(url: string): string;
}

export abstract class BaseRepository implements IBaseRepository {
  public http: IHttp;
  public apiKey: string;

  constructor() {
    this.http = new Http();
    this.apiKey = '6f25fc09a22b52063bb7cc2947cccfe6';
  }

  public weatherUrl(url: string): string {
    return `http://api.openweathermap.org/${url}&appid=${this.apiKey}&units=metric`;
  }
}