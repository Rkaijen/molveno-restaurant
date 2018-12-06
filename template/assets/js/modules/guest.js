'use strict'
/*
* assets/js/modules/guest.js
* TODO : build module; add functions (overview, view, get, add, update & delete) to let things happen
*/


function mainGuests(){
  overviewGuests();
}
/* -----------------------------------------------------------------------------
* overview
*/
function overviewGuests(){
  console.log("overviewGuest says hi");
}
/* -----------------------------------------------------------------------------
* add
*/
function addGuest(){
  console.log("addGuest says hi");
}

function addGuestFromReservation( guest ){

  let addGuestId = getRandomInt(1000,9999);
  guest[ 'id' ] = addGuestId;
  _glob.arr.guests.push( guest ); // NOTE : make call to REST API in the near future...
  return addGuestId;
}

/* -----------------------------------------------------------------------------
* view
*/
function viewGuest(){
  console.log("viewGuest says hi");
}
/* -----------------------------------------------------------------------------
* get
*/
function getGuest( id ){
  for( let guest of _glob.arr.guests )if ( guest.id/1 === id/1 ) return guest;
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
* get
*/
function setGuest( guest ){
  for( let i = 0; i < _glob.arr.guests.length; i++) if( _glob.arr.guests[i].id/1 === guest.id/1 ) _glob.arr.guests[i] = guest
  return guest
}
/* -----------------------------------------------------------------------------
* update
*/
function updateGuest( id ){
  navTab({
    id : 'update',
    href : `#guests/update/${id}`,
    icon : '',
    label : 'Edit Guest'

  })
  let output = document.querySelector( '#page_output' )
  $( output ).load( 'templates/update-guest.html', () => {
    let form = output.querySelector( 'form'),
    update_guest = form.elements,
    guest = getGuest( id )

    for( let field of update_guest ) field.value = guest[ field.id ]
    $( form ).on( 'submit', (event) => {
      event.preventDefault()
      update_guest = event.target.elements;
      let set_reservation = setReservation({
        id : id,
        firstname : update_guest.firstname,
        preposition : update_guest.preposition,
        lastname : update_guest.lastname,
        telephone : update_guest.telephone,
        email : update_guest.email
      })
      overviewGuests()
      navTabRemove( 'update' )
      bsAlert( '#page_output', 'primary', '', `Details for ${getGuestName(id)} have been updated` )
    })
  })
}
/* -----------------------------------------------------------------------------
* delete
*/
function deleteGuest(){
  console.log("deleteGuest says hi");
}

function deleteGuestFromReservation( id ){
  let new_arr = [];
  let guests = _glob.arr.guests;
  for( let guest of guests ){
    if ( guest.id/1 !== id/1 ) new_arr.push( guest );
  }
  _glob.arr.guests = new_arr; // NOTE : make call to REST API in the near future...
}
