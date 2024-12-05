import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from './shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ConfigService } from './services/config.service';

export function loadConfig(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
     {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
