import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class EmpresaService {

  constructor(private db: AngularFireDatabase) {}

  getEmpresas(offset, startKey?): FirebaseListObservable<any> {

    return this.db.list('empresa/', {
              query: {
                orderByKey: true,
                startAt: startKey,
                limitToFirst: offset+1
              }
            });
    }

  }