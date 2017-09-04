
import { TeamHomePage } from './../team-home/team-home';
import { EliteApi } from './../../app/shared/elite-api.service';
import { TournamentsPage } from './../tournaments/tournaments';
import { LoadingController,NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserSettings } from '../../app/shared/user-settings.service';



        @Component({
            selector: 'page-myteams',
            templateUrl: 'my-teams.page.html'
          })


export class MyTeamsPage
{
  favorites:any[]=[];/*
      {
          team:{id:6182,name: 'HC Elite 7th', coach:"Michelotti"},
      tournamentId:'89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
      tournamentName:'March Madness Tournament'

      },
      {
        team:{id:805,name: "HC Elite", coach:"Michelotti"},
    tournamentId:'98c6857e-b0d1-4295-b89e-2d95a45437f2',
    tournamentName:'Holiday Hoops Challenge'

  }];*/


   constructor(private nav: NavController,
   private eliteApi:EliteApi,
   private loadingController:LoadingController,
  private userSettings:UserSettings)
  {

    console.log('entrou na pagina principal');



}

goToTournaments(){

    this.nav.push(TournamentsPage);

}

favoriteTapped($event,favorite)
{
    let loader=this.loadingController.create({
        content:'Getting data...',
        dismissOnPageChange: true
    });

loader.present();
this.eliteApi.getTournamentData(favorite.tournamentId)
.subscribe(t=>this.nav.push(TeamHomePage,favorite.team))
//favorite.team


}


 ionViewDidEnter(){


  let loader=this.loadingController.create({content:'Getting data...'});
   loader.present();
  this.userSettings.getAllFavorites().then(saida =>{this.favorites=saida;
   // console.log('lista de favoritos',this.favorites);
   // console.log('lista de favoritos 2',this.favorites[0].team.name);
   loader.dismiss();
  });
}

}


