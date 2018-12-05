'use strict'
/*
* assets/js/class/guest.js
*/
class Guest {
  constructor(id, firstname, preposition, lastname,
  email, telephone, reservation ) {
    if(typeof id === 'object'){
      let data = id;
      this._id = data.id;
      this._firstname = data.firstname;
      this._preposition = data.preposition;
      this._lastname = data.lastname;
      this._email = data.email;
      this._telephone = data.telephone;
      this._reservation = data.reservation;
    } else {
      this._id = id;
      this._firstname = firstname;
      this._preposition = preposition;
      this._lastname = lastname;
      this._email = email;
      this._telephone = telephone;
      this._reservation = reservation;
    }
  }
}
