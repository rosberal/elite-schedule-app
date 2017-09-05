import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { MyTeamsPage} from '../pages/my-teams/my-teams.page';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TeamsPage } from './../pages/teams/teams';
import { GamePage } from './../pages/game/game';
import {StandingsPage} from './../pages/standings/standings';
import {TeamHomePage} from './../pages/team-home/team-home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{MapPage} from'./../pages/map/map';
@NgModule({
  declarations: [
    MyApp,
  //  HomePage,
//    ListPage,
   MyTeamsPage,
   TournamentsPage,
   TeamDetailPage,
   TeamsPage,
   TeamHomePage,
   StandingsPage,
   GamePage,
   MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  //  HomePage,
   // ListPage,
   MyTeamsPage,
   TournamentsPage,
   TeamDetailPage,
   TeamsPage,
   TeamHomePage,
   StandingsPage,
   GamePage,
   MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
