import { EliteApi } from './../../app/shared/elite-api.service';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/** * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  // teams=
  // [
  //   {id:1, name: 'HC Elite'},
  //   {id:2, name: 'Team Takeover'},
  //   {id:3, name: 'DC Thunder'},


  // ];
  teams=[];
  
  constructor(public navCtrl: NavController, private navParams: NavParams,
    private eliteApi:EliteApi) {
  }

  ionViewDidLoad() {
    let selectedTourney=this.navParams.data;

  this.eliteApi.getTournamentData(selectedTourney.id)
  .subscribe(data=>{this.teams=data.teams;
  });
}

itemTapped($event,team)
{
  this.navCtrl.push(TeamHomePage,team)
}

}

