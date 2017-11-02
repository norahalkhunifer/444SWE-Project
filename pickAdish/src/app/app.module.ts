import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListsPage } from '../pages/lists/lists';
import { ProfilePage } from '../pages/profile/profile';
import { ShopsPage } from '../pages/shops/shops';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import{AngularFireModule}from 'angularfire2';
import{AngularFireAuthModule}from 'angularfire2/auth';
import{AngularFireDatabaseModule}from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './ap.firebase.config';
import { AuthProvider } from '../providers/auth/auth';
import {DishPageService} from '../providers/dish-page/dish-page.service';
import { Camera } from '@ionic-native/camera';//import in app.module.ts

//import { RegisterPage } from '../pages/register/register';


@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    ProfilePage,
    HomePage,
    ShopsPage,
    TabsPage,
   // LoginPage,
   // RegisterPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   ListsPage,
    ProfilePage,
    HomePage,
        ShopsPage,
        TabsPage,
//LoginPage,
    //RegisterPage,

  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider, DishPageService
  ]
})
export class AppModule {}
