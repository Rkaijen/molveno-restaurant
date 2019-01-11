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
    { id : 23456, date : '19-12-2018', time_arrival : '10:45 AM', time_depart : '1:45 PM', guest : 84356, persons : 2, table : [3], comments : '' },
    { id : 23457, date : '20-12-2018', time_arrival : '6:30 PM', time_depart : '9:30 PM', guest : 74309, persons : 5, table : [8], comments : '' },
    { id : 23458, date : '20-12-2018', time_arrival : '11:30 AM', time_depart : '3:30 PM', guest : 48526, persons : 4, table : [12], comments : '' },
    { id : 23459, date : '21-12-2018', time_arrival : '11:30 AM', time_depart : '3:30 PM', guest : 38756, persons : 4, table : [16], comments : '' },
    { id : 23460, date : '23-12-2018', time_arrival : '10:30 AM', time_depart : '1:30 PM', guest : 64526, persons : 4, table : [21], comments : '' }
  ] );
  

  glob( 'arr', 'ingredients',[
    {id :12000, name : 'macaroni', price : 1.00, category : 'pasta', unit : 'gram', allergies : 'gluten'},
    {id :12001, name : 'steak', price : 2.00, category : 'meat', unit : 'piece', allergies : 'none'},
    {id :12002, name : 'cheddar cheese', price : 1.50, category : 'cheese', unit : 'gram', allergies : 'milk'},
    {id :12003, name : 'wallnuts', price : 1.57, category : 'nuts', unit : 'gram', allergies : 'nuts'},
    {id :12004, name : 'mozzarella', price : 0.96, category : 'cheese', unit : 'gram', allergies : 'milk'},
    {id :12005, name : 'tomato sauce', price : 0.31, category : 'sauce', unit : 'mililiter', allergies : 'none'},
    {id :12006, name : 'pizza dough', price : 1.12, category : 'dough', unit : 'ball', allergies : 'gluten'},
    {id :12007, name : 'oregano', price : 0.08, category : 'herbs', unit : 'miligram', allergies : 'none'},
    {id :12008, name : 'carrot', price : 0.30, category : 'vegetable', unit : 'gram', allergies : 'none'},
    {id :12009, name : 'lettuce', price : 0.24, category : 'vegetable', unit : 'gram', allergies : 'none'},
    {id :12010, name : 'potatoes', price : 0.45, category : 'vegetable', unit : 'gram', allergies : 'none'},
    {id :12011, name : 'Coca cola', price : 0.50, category : 'beverage', unit : 'piece', allergies : 'none'},
    {id :12012, name : 'Hotdogs', price : 0.73, category : 'meat', unit : 'piece', allergies : 'none'},

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
    {id : 1, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 2, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 3, chairs : 4, reservation : 23456, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 4, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 5, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 6, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 7, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 8, chairs : 6, reservation : 23457, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 9, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 10, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 11, chairs : 2, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 12, chairs : 4, reservation : 23458, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 13, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 14, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 15, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 0 },
    {id : 16, chairs : 6, reservation : 23459, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 17, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 18, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 19, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 20, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 21, chairs : 8, reservation : 23460, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 22, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 23, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 0 },
    {id : 24, chairs : 8, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 25, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 26, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 27, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 28, chairs : 4, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
    {id : 29, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 0, status: 1 },
    {id : 30, chairs : 6, reservation : 0, guest: 0, order : 0, wheelchair: 1, status: 1 },
  ] );

  glob( 'arr', 'menuitems' , [
    { id : 13000, name : 'Pizza Margarita', ingredients : [{ id : 12004, quantity : 125}, { id : 12005, quantity : 100}, { id : 12006, quantity : 450}, { id : 12007, quantity : 5}], price: 12.00 , percentage :250, recipe : 'Make pizza', picture : '...'},
    { id : 13001, name : 'Coca Cola', ingredients : [{id: 12011, quantity : 1}], price: 2.00, percentage : 400, recipe : '...', picture : '...'},
    { id : 13002, name : 'Mac & Cheese', ingredients : [{ id : 12000, quantity : 100}, { id : 12002, quantity : 200}, { id : 12012, quantity : 100}], price: 8.00, percentage : 300, recipe : 'Make Mac & Cheese', picture : '...'},


  ] );
  glob( 'arr', 'orders' , [
    //id, guest, order, date, invoice, menuitems
  ] );


  glob( 'arr', 'invoices' , [
      // id, order, guest, amount, menuitems
  ] );



}
