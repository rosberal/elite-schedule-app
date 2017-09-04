import { Injectable } from "@angular/core";
import { Events, ItemContent } from "ionic-angular";
import { Storage } from "@ionic/storage";
//import { SqlStorage } from './sql-storage.service';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const win: any = window;

@Injectable()
export class UserSettings {
  length: number;
  arraydeFavoritos: number[][];

  constructor(
    public events: Events,
    private storage: Storage
  ) //private sql:SQLite
  {
    // let path:any;
    //path=this.storage.driver();
    //console.log("Path do Banco", this.storage.driver);
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };
    console.log("sql fav ", this.storage);
    console.log("sql item ", item);
    this.storage.set(team.id.toString(), JSON.stringify(item)).then(data => {
      this.events.publish("favorites:changed");
      console.log("sql fav 2", this.storage);
    });
  }

  unfavoriteTeam(team) {
    console.log("sql unfav", this.storage);
    this.storage.remove(team.id.toString()).then(data => {
     this.events.publish("favorites:changed");
      console.log("sql unfav 2", this.storage);
    });
  }

  isFavoriteTeam(teamId): Promise<boolean> {
    return this.storage
      .get(teamId.toString())
      .then(value => (value ? true : false));
  }

  getAllFavorites():  Promise<any[]> {
    //this.sql.length().then(value => value ? true : false);
    let resultado: any[] = [];
    let value: any;
    let key: string;
    let index: number;
    let tamanhoStorage;
    let i: number;
    //this.storage.clear();
    return new Promise(executor =>{
      console.log("Path do Banco", this.storage.driver);
      this.storage.forEach((value, key, index) => {
        console.log("TamanhoStorage", tamanhoStorage);
        console.log("This is the value", value);
        console.log("from the key", key);
        console.log("Index is", index);
        resultado.push(JSON.parse(value));
        }).then(r => executor(resultado));
    });
}

}
