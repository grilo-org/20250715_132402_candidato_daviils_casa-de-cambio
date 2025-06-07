import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class CoinService {
  public BASE_URL = environment.base_url;

  constructor(public http: HttpClient) {
  }

  getCoins() {
    const url = `${this.BASE_URL}/moedas`;
    return this.http.get(url);
  }
}
