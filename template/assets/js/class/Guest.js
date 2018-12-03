'use strict'
/*
* assets/js/class/guest.js
*/
class Guest {
  constructor(id, firstname, preposition, lastname,
  email, telephone, reservation ) {
    //console.log(arguments)
  if(typeof id === 'object'){  // arguments als object
    let data = id; // feitelijk id parameter dus..
    this._id = data.id;
    this._firstname = data.firstname;
    this._preposition = data.preposition;
    this._lastname = data.lastname;
    this._email = data.email;
    this._telephone = data.telephone;
    this._reservation = data.reservation;
  } else { // specifieke arguments uit parameters
    this._id = id;
    this._firstname = firstname;
    this._preposition = preposition;
    this._lastname = lastname;
    this._email = email;
    this._telephone = telephone;
    this._reservation = reservation;
  }

///*



//*/
  }

  get profile() { // overbodig(?); instantie geeft hetzelfde terug?
    return {
      id: this._id,
      firstname: this._firstname,
      preposition: this._preposition,
      lastname: this._lastname,
      dateofbirth: this._dateofbirth,
      gender: this._gender,
      email: this._email,
      phonenumber: this._phonenumber,
      street: this._street,
      housenumber: this._housenumber,
      city: this._city,
      postalcode: this._postalcode
      // groupsize: this._groupsize,
      // dateofvisit: this._dateofvisit,
      // arrangement: this._arrangement,
    };
  }

  //Labels
  getPropertyLabel(){
    return {
      _id: 'Id',
      _firstname: 'First name',
      _preposition: 'Preposition',
      _lastname: 'Last name',
      _dateofbirth: 'Date of birth',
      _gender: 'Gender',
      _email: 'E-mail',
      _phonenumber: 'Phone',
      _street: 'Street',
      _housenumber: 'House nr.',
      _city: 'City',
      _postalcode: 'Postal code'
      // _groupsize: 'Group size',
      // _dateofvisit: 'Date of visit',
      // _arrangement: 'Arrangement',
    };
  }



}
/*
let data_ = {
  id: 23456,
  firstname: 'John',
  preposition: '',
  lastname: 'Doe',
  dateofbirth: '01-01-01',
  gender: 'male',
  email: 'j.doe@provider.com',
  phonenumber: '01234 56789',
  street: 'Main Street',
  housenumber: 12,
  city: 'Hometown',
  postalcode: '1234 AB'
}

let classInst = new Guest( data_ )
console.log( classInst )
classInst = new Guest( 23456, 'John', '', '01-01-01', 'male',  'j.doe@provider.com', '01234 56789', 'Main Street', 12, '1234 AB' )
console.log( classInst.profile )
*/
