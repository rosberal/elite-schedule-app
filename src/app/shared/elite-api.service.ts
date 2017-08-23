import{Http,Response} from '@angular/http';
import{Injectable }from '@angular/core';
@Injectable()
export class EliteApi
{

    private baseUrl='https://elite-schedule-app-i2-926a0.firebaseio.com';
constructor(private http:Http){}

getTournaments()
{
return new Promise(resolve=>
    {
    this.http.get('$this.baseUrl}/tournaments.json').subscribe(res=>resolve(res.json()));
    }); 
}   

}