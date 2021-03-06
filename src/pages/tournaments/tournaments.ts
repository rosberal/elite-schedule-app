import { EliteApi } from './../../app/shared/elite-api.service';
import { TeamsPage } from './../teams/teams';
import { MyTeamsPage } from './../my-teams/my-teams.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
tournaments: any;

constructor(public navCtrl: NavController, public navParams: NavParams,
  private eliteApi:EliteApi,private loadingController:LoadingController)
 {
 
  }
itemTapped($event,tourney)
  {
  
    this.navCtrl.push(TeamsPage,tourney);
   
  }

ionViewWillEnter()
{

}

  ionViewDidLoad() {
let loader =this.loadingController.create({
  content:'Getting tournaments...'
});
loader.present().then(()=>{    
this.eliteApi.getTournaments().then(data=>
  {
   this.tournaments=data;
  loader.dismiss();
}); 
});
  }

}
