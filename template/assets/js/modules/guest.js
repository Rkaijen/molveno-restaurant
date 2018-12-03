'use strict'
/*
* assets/js/modules/guest.js
* TODO : build module; add functions (overview, view, get, add, update & delete) to let things happen
*/
glob( 'module',  'guests', () => mainGuest() )
glob( 'module',  'guests/update', () => updateGuest( location.hash.split('/')[2]) )
function mainGuest(){
  overviewGuest();
}
/* -----------------------------------------------------------------------------
* overview
*/
function overviewGuest(){
  console.log("overviewGuest says hi");
}
/* -----------------------------------------------------------------------------
* add
*/
function addGuest(){
  console.log("addGuest says hi");
}
/* -----------------------------------------------------------------------------
* view
*/
function viewGuest(){
  console.log("viewGuest says hi");
}
/* -----------------------------------------------------------------------------

/* -----------------------------------------------------------------------------
* get
*/
function getGuest( id ){
  let guests = _glob.arr.guests;
  for( let guest of guests ){
    if ( guest.id === id ) return guest;
  }
}

function getGuestName( id ){
  let guest = getGuest( id ),
  firstname = guest.firstname,
  preposition = guest.preposition,
  lastname = guest.lastname;
  if( preposition !== '' ) preposition =+ ' '
  return `${firstname} ${preposition}${lastname}`
}
/* -----------------------------------------------------------------------------
* update
*/
function updateGuest( id ){
  console.log( id );
}
/* -----------------------------------------------------------------------------
* delete
*/
function deleteGuest(){
  console.log("deleteGuest says hi");
}

function addGuestFromReservation( guest ){

  let addGuestId = getRandomInt(1000,9999);
  guest[ 'id' ] = addGuestId;
  _glob.arr.guests.push( guest ); // NOTE : make call to REST API in the near future...
  return addGuestId;
}

function deleteGuestFromReservation( id ){
  let new_arr = [];
  let guests = _glob.arr.guests;
  for( let guest of guests ){
    if ( guest.id/1 !== id/1 ) new_arr.push( guest );
  }
  _glob.arr.guests = new_arr; // NOTE : make call to REST API in the near future...
}
