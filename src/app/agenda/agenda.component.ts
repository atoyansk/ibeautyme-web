import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Profissional } from '../profissionais/profissional';
import * as firebase from 'firebase';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  initialLocaleCode = 'pt-br';

  userId: string;
  $key: string;
  value: any;
  profissionais: FirebaseListObservable<Profissional[]>;
  profissional: FirebaseObjectObservable<Profissional>;
  perfil: FirebaseListObservable<any[]>;

  selectedP: Profissional;
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) { 
  
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
      this.profissionais = this.db.list(`profissionais/${this.userId}`);
    })
  }

  ngOnInit() {
    
  } 
  
  calendarOptions:Object = {
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'agendaWeek,agendaDay'
    },
    locale: this.initialLocaleCode,
    fixedWeekCount: true,
    defaultView: 'agendaWeek',
    defaultDate: Date.now(),
    navLinks: true,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    minTime: '07:00', 
    maxTime: '20:00',
    businessHours: [{
      dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
      start: '08:00',
      end: '12:00'
    }, {
      dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
      start: '13:00',
      end: '20:00'
    }],
    events: [
      {
        title: 'All Day Event',
        start: '2018-02-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2018-02-12T10:30:00',
        end: '2018-02-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

  onSelect(p: Profissional): void {
    this.selectedP = p;
    console.log(p);
  }
}