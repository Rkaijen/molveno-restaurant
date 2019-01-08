'use strict'
/*
* assets/js/class/Reservation.js
*/

class Reservation {
  constructor (id, guest, date, time_arrival, time_depart, persons, table, comments) {
    if( typeof id === 'object'){ // arguments als object
      let data = id;
      this._id = data.id;
      this._guest = data.guest;
      this._date = data.date;
      this._time_arrival = data.time_arrival;
      this._time_depart = data.time_depart;
      this._persons = data.persons;
      this._table = data.table;
      this._comments = data.comments;
    }else{
      this._id = id;
      this._guest = guest;
      this._date = date;
      this._time_arrival = time_arrival;
      this._time_depart = time_depart;
      this._persons = persons;
      this._table = table;
      this._comments = comments;

    }

  }
  
}
