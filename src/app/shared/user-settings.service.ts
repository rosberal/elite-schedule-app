import { Injectable } from '@angular/core';
import { Events,} from 'ionic-angular';
import {Storage } from '@ionic/storage';
import { SqlStorage } from './sql-storage.service';

const win: any = window;

@Injectable()

export class UserSettings {
  length: number;
  arraydeFavoritos: number[][];


  constructor(
    public events: Events,
    public storage: Storage,
    private sql: Storage) {
      console.log("'entrou no construtor do user settings");
    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
       this.sql.set(team.id.toString(), JSON.stringify(item)).then(data => {
                this.events.publish('favorites:changed');
        });
    }

    unfavoriteTeam(team) {

            this.sql.remove(team.id.toString()).then(data => {
                this.events.publish('favorites:changed');
            });
        }

    isFavoriteTeam(teamId) : Promise<boolean> {

            return this.sql.get(teamId.toString()).then(value => value ? true : false);
    }

    getAllFavorites() : any[] {
      //this.sql.length().then(value => value ? true : false);
let results=[];
let value:any;
let key:string;
let index: number;
 this.sql.forEach( (value, key, index) => {
  console.log("This is the value", value)
	console.log("from the key", key)
  console.log("Index is", index)
   results.push(key,value);
  });

return results;


    }



      }



