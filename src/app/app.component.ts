

import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TeamsPage } from './../pages/teams/teams';
import { GamePage } from './../pages/game/game';

import {HttpModule} from '@angular/http';
import { EliteApi } from './shared/elite-api.service';
import { UserSettings } from './shared/user-settings.service';
import { TeamHomePage } from '../pages/team-home/team-home';


@Component({
  templateUrl: 'app.html',
  //imports: [],
  providers: [EliteApi,HttpModule,UserSettings]



})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams:any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
    private userSettings:UserSettings,
    private  eliteApi:EliteApi,
private loadingController: LoadingController
  )
    {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

       // { title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage }

      { title: 'MyTeams', component: MyTeamsPage },
      {title:'Tournaments',component:TournamentsPage},
      {title:'Teams',component:TeamsPage},
      {title:'TeamDetail',component:TeamDetailPage},
      {title:'Game',component:GamePage}



    ];

  }

   initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.rootPage = MyTeamsPage;
      //this.refreshFavorites();

      /* this.userSettings.initStorage().then(() => {

        this.rootPage = MyTeamsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });*/

    });
  }

refreshfavorites(){
  this.userSettings.getAllFavorites().then(saida =>this.favoriteTeams=saida);
console.log('lista de favoritos',this.favoriteTeams);

}
goHome(){this.nav.push(MyTeamsPage);}
goToTournaments(){this.nav.push(TournamentsPage);}

goToTeam(favorite)
{
let loader=this.loadingController.create({
  content: 'Getting data ...',
dismissOnPageChange: true

});
loader.present();
this.eliteApi.getTournamentData(favorite.tournanetId).subscribe(l=>this.nav.push(TeamHomePage, favorite.team));
}

}
