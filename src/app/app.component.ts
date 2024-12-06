import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    console.log(this.configService.get('MY_SECRET_KEY'));
  }

  add(a: number, b: number) {
    return a + b;
  }
}
