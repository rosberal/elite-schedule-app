import { MyTeamsPage } from './../my-teams/my-teams.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StandingsPage} from './../standings/standings';
import {TeamDetailPage} from './../team-detail/team-detail';
/**
 * Generated class for the TeamHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
team: any;
  teamDetailTab=TeamDetailPage;
standingsTab=StandingsPage;
  

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.team=this.navParams.data
  }
  goHome()
  {
  /*this.navCtrl.push(MyTeamsPage)*/
  this.navCtrl.popToRoot()
  }

ionViewWillEnter(){
 console.log('ate aqui 5');
}
  ionViewDidLoad() {
    console.log('ate aqui 6  ');
    console.log('ionViewDidLoad TeamHomePage');
  }

}
