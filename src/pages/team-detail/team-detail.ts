import { Component } from '@angular/core';
import { IonicPage,ToastController,AlertController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TournamentsPage } from '../tournaments/tournaments';
import { UserSettings } from './../../app/shared/user-settings.service';
import { GamePage } from './../game/game';
import { EliteApi } from './../../app/shared/elite-api.service';


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
  allGames: any[];
  dateFilter:string;
  games:any[];
  team: any;
  teamStanding: any;
  private tourneyData: any;
private toast: any;
  useDateFilter=false;
  isFollowing=false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi:EliteApi,
  private alertController:AlertController,
  private toastController:ToastController,
private userSettings:UserSettings) {
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
  homeAway:(isTeam1 ? "vs.":"at")
};
})
.value();
this.allGames=this.games;
this.teamStanding = _.find(this.tourneyData.standings,{'teamId':this.team.id});
console.log('TeamStanding', this.teamStanding);
this.userSettings.isFavoriteTeam(this.team.id).then(value =>this.isFollowing=value);

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
getScoreWorL(game){
return game.scoreDisplay ? game.scoreDisplay[0]:'';
}

getScoreDisplayBadgeClass(game){

 //console.log("teste2");
 // console.log("teste",game.scoreDisplay.indexOf('W:')===0?'badge-primary':'badge-danger');

return game.scoreDisplay.indexOf('W:')===0 ? 'primary':'danger';
}

dateChanged(){
if (this.useDateFilter) {
    this.games=_.filter(this.allGames,g=>moment(g.time).isSame(this.dateFilter,'day'));
} else {
this.games=this.allGames;
}

}
toggleFollow(){
if(this.isFollowing){
  let confirm=this.alertController.create({
title:'Unfollow?',
message:'Are you sure you want to unfollow?',
buttons: [
{text: 'Yes',
handler:()=>{this.isFollowing=false;
  console.log('vai rodar o unfavoriteTeam');
  console.log('tournament.id',this.tourneyData.tournament);
    this.userSettings.unfavoriteTeam(this.team);


let  toast=this.toastController.create({
  message: 'You have unfollowed this team.',
  duration:2000,
  position:'bottom'
});
toast.present();

}},
{text: 'No'}
]
  });
confirm.present();
} else
{
  this.isFollowing=true;
  console.log('vai rodar o favoriteTeam');
  console.log(this.team,'tournament.id',this.tourneyData.tournament);
  this.userSettings.favoriteTeam(this.team,  this.tourneyData.tournament.id,
  this.tourneyData.tournament.name);
}
}

refreshAll(refresher)
{
  console.log('Chamou a função do refresher');
  this.eliteApi.refreshCurrentTourney().subscribe(() =>
  {
    refresher.complete();
    this.ionViewDidLoad();
});
}



}
