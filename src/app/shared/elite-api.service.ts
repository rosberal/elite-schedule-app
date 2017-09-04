import{Http,Response} from '@angular/http';
import{Injectable }from '@angular/core';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi
{
    //console.log('Ate aqui 2');
    private baseUrl='https://elite-schedule-app-i2-926a0.firebaseio.com';

currentTourney: any={};
tourneyData={};

    constructor(private http:Http){

       //this.getTournaments(); //tentativa de coerrigir erro

    }


getTournaments()
{

    return new Promise(resolve=>
    {

        this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res=>resolve(res.json()));
});
}

getTournamentData(tourneyId,forceRefresh:boolean =false):Observable<any>
{
if (!forceRefresh && this.tourneyData[tourneyId])
{
this.currentTourney=this.tourneyData[tourneyId];
console.log('**no need to make HTTP call, just return the data')
return Observable.of(this.getCurrentTourney);
}
//don´t have data yet
console.log('**about to make HTTP call');
return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
.map((response:Response)=>{
  this.tourneyData[tourneyId]=response.json();
  this.currentTourney=this.tourneyData[tourneyId];
return this.currentTourney;
});





}




getCurrentTourney(){
    return this.currentTourney;
}


refreshCurrentTourney()
{
return this.getTournamentData(this.currentTourney.tournament.id,true);
}


}


