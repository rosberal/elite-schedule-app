import {TeamHomePage } from './../team-home/team-home';
import { EliteApi } from './../../app/shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MapPage  } from './../map/map';

 /* Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
game:any;

constructor(public navCtrl: NavController,
    public navParams: NavParams,private eliteApi:EliteApi)
    {
      this.game=this.navParams.data;
    }

  ionViewDidLoad() {
   this.game=this.navParams.data;
this.game.gameTime=Date.parse(this.game.time);
console.log("game",this.game);
}


teamTapped(teamId)
{

  let tourneyData=this.eliteApi.getCurrentTourney();
  let team=tourneyData.teams.find(t=>t.id===teamId);

  this.navCtrl.push(TeamHomePage,team);
}

goToDirections(){}

goToMap(){
this.navCtrl.push(MapPage,this.game)
}



isWinner(score1,score2){

 if (Number(score1)>Number(score2))
{return "primary";}
return"secondary";


}



}
