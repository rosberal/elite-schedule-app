import { GamePage } from './../game/game';
import { EliteApi } from './../../app/shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { TournamentsPage } from '../tournaments/tournaments';


/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
 games:any[];
  team: any;
  teamStanding: any;
  private tourneyData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi:EliteApi) {
  this.team=this.navParams.data;
  this.tourneyData=this.eliteApi.getCurrentTourney();
  this.teamStanding = _.find(this.tourneyData.standings,{'teamId':this.team.id});
  console.log('**nav params:',this.navParams)

}

  ionViewDidLoad() {
 console.log('ate aqui 2');
    this.team=this.navParams.data;
 this.tourneyData=this.eliteApi.getCurrentTourney();
this.games=_.chain(this.tourneyData.games)
.filter(g=>g.team1Id===this.team.id||g.team2Id===this.team.id)
.map(g=>{let isTeam1=(g.team1Id===this.team.id);
let opponentName=isTeam1?g.team2:g.team1;
let scoreDisplay=this.getScoreDisplay(isTeam1,g.team1Score,g.team2Score)
return {
  gameId:g.id,
  opponent:opponentName,
  time:Date.parse(g.time),
  location:g.location,
  locationUrl: g.locationUrl,scoreDisplay:scoreDisplay,
  homeAway:(isTeam1 ? "Vs.":"at")
};
})
.value();
this.teamStanding = _.find(this.tourneyData.standings,{'teamId':this.team.id});
console.log('TeamStanding', this.teamStanding);
}
getScoreDisplay(isTeam1,team1Score,team2Score){
  if (team1Score&& team2Score){
      var teamScore=(isTeam1? team1Score:team2Score);
      var opponentScore=(isTeam1? team2Score:team1Score);
      var winindicator=teamScore>opponentScore? "W: " : "L: ";
      return winindicator+teamScore+"-"+opponentScore;
  }
  else {return "";}

}

gameClicked($event,game)
{

  let sourceGame=this.tourneyData.games.find(g=>g.id===game.gameId);

  this.navCtrl.parent.parent.push(GamePage,sourceGame);

}

}
