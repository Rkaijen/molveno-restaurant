'use strict';
/*
* data/glob.js
* TODO : getGlobDataAPI()
*/

function getGlobDataAPI(){

}

function globArr(){

  glob( 'arr', 'reservations' , [
    //id, timestamp, guest, persons, table, arrangement, comments
    // http://listofrandomnames.com/index.cfm?generated
    { id : 23456, date : '19-02-2019', time_arrival : '9:45', time_depart : '12:45', guest : 84356, persons : 2, table : [3], comments : '' },
    { id : 23457, date : '20-02-2019', time_arrival : '10:15', time_depart : '13:15', guest : 74309, persons : 5, table : [8], comments : '' },
    { id : 23458, date : '20-02-2019', time_arrival : '11:25', time_depart : '14:25', guest : 48526, persons : 4, table : [12], comments : '' },
    { id : 23459, date : '21-02-2019', time_arrival : '10:35', time_depart : '13:35', guest : 38756, persons : 4, table : [16], comments : '' },
    { id : 23460, date : '23-02-2019', time_arrival : '9:25', time_depart : '12:25', guest : 64526, persons : 4, table : [21], comments : '' }
  ] );

  glob( 'arr', 'ingredients',[
    {id :12000, name : 'Spaghetti', price : 1.00, type : 'pasta', unit : 'gram', allergies : 'gluten'},
    {id :12001, name : 'steak', price : 2.00, type : 'meat', unit : 'stuks', allergies : 'none'},
    {id :12002, name : 'goat cheese', price : 1.50, type : 'cheese', unit : 'liter', allergies : 'milk'},
    {id :12003, name : 'wallnuts', price : 0.57, type : 'nuts', unit : 'gram', allergies : 'nuts'},
    {id :12004, name : 'carrot', price : 0.30, type : 'vegetable', unit : 'gram', allergies : 'none'}
  ]);

  glob( 'arr', 'guests' , [
    // id, firstname, preposition, lastname, email, telephone, country
    { id : 84356, firstname : 'Corene', preposition : '', lastname : 'Lukowski', email : 'c.lukowski@verizon.ca', telephone : '', country : 'ca' },
    { id : 74309, firstname : 'Boyce', preposition : '', lastname : 'Villafuerte', email : 'b.villafuerte@tiscali.it', telephone : '+393164716566', country : 'it' },
    { id : 48526, firstname : 'Lisette', preposition : '', lastname : 'Copeland', email : 'l.copeland@vodafone.co.uk', telephone : '', country : 'uk' },
    { id : 38756, firstname : 'Horacio', preposition : '', lastname : 'Lomeli', email : 'h.lomeli@telefonica.it', telephone : '', country : 'it' },
    { id : 64526, firstname : 'Jan', preposition : '', lastname : 'Cornelissen', email : 'j.cornelissen@telfort.nl', telephone : '+3130584532', country : 'nl' },
  ] );

  glob( 'arr', 'tables' , [
    //id, chairs, reservation, guest, wheelchair
    {id : 1, nr: 1, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 2, nr: 2, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 3, nr: 3, chairs : 4, reservation : 23456, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 4, nr: 4, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 5, nr: 5, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 6, nr: 6, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 7, nr: 7, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 8, nr: 8, chairs : 6, reservation : 23457, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 9, nr: 9, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 10, nr: 10, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 11, nr: 11, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 12, nr: 12, chairs : 4, reservation : 23458, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 13, nr: 13, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 14, nr: 14, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 15, nr: 15, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 0 },
    {id : 16, nr: 16, chairs : 6, reservation : 23459, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 17, nr: 17, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 18, nr: 18, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 19, nr: 19, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 20, nr: 20, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 21, nr: 21, chairs : 8, reservation : 23460, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 22, nr: 22, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 23, nr: 23, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 24, nr: 24, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 25, nr: 25, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 26, nr: 26, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 27, nr: 27, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 28, nr: 28, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 29, nr: 29, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 30, nr: 30, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
  ] );


  glob( 'arr', 'orders' , [
    //id, guest, order, date, invoice, menuitems
  ] );


  glob( 'arr', 'invoices' , [
      // id, order, guest, amount, menuitems
  ] );



}
