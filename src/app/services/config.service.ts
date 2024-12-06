import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    // 
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(res => {
        console.log('loadConfig', res);
      });
    return firstValueFrom(
      this.http.get('/assets/config/env.json')
    ).then((data) => {
      console.log(data);
      this.config = data;
    });
  }

  get(key: string): any {
    return this.config[key];
  }
}
