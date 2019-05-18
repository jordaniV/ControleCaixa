import { ModalCaixaPageModule } from './modals/modal-caixa/modal-caixa.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './services/storage/storage.service';

import { ReactiveFormsModule} from '@angular/forms';
import { ModalMovimentoPageModule } from './modals/modal-movimento/modal-movimento.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ModalCaixaPageModule,
    ModalMovimentoPageModule,
    ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
