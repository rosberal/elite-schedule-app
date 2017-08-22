import { TournamentsPage } from './../tournaments/tournaments';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';



        @Component({
            selector: 'page-myteams',
            templateUrl: 'my-teams.page.html',
          })
 

export class MyTeamsPage
{
    constructor(private nav: NavController){}

goToTournaments(){this.nav.push(TournamentsPage);}

}


