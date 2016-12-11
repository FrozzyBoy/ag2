export interface IHttp {
  request<T>(method: string, url: string, callback?: (data: T) => void): void;
}

export class Http implements IHttp {
  public request<T>(method: string, url: string, callback?: (data: T) => void): void {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        let data: T = JSON.parse(xhr.responseText);
        if (callback) {
          callback(data);
        }
      }
    }
  }
}