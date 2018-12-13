'use strict';

class Table {
  constructor (id, chairs, reservation, guest, order, wheelchair, status) {
    if( typeof id === 'object'){ // arguments als object
      let data = id;
      this._id = data.id;
      this._chairs = data.chairs;
      this._reservation = data.reservation;
      this._guest = data.guest;
      this._order = data.order;
      this._wheelchair = data.wheelchair;
      this._status = data.status;
    }else{
      this._id = id;
      this._chairs = chairs;
      this._reservation = reservation;
      this._guest = guest;
      this._order = order;
      this._wheelchair = wheelchair;
      this._status = status;
      
    }
  }
}
