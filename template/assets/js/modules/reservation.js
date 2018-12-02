'use strict'
/*
* assets/js/modules/reservation.js
* TODO ccolombijn : addReservation() - table selection / date/time input & validation
*
*
* integration REST API
*/
setModule( 'reservations', () => overviewReservations() )
setModule( 'reservations/add', () => addReservation() )
setModule( 'reservations/overview', () => overviewReservations() )
setModule( 'reservations/update', () => updateReservation( location.hash.split('/')[2]) )
setModule( 'reservations/delete', () => deleteReservation( location.hash.split('/')[2]) )
setModule( 'reservations/view', () => viewReservation( location.hash.split('/')[2]) )

function getReservation( id ){
  for( let reservation of _glob.arr.reservations ) if( reservation.id/1 === id/1 ) return reservation
}

function setReservation( reservation ){
  for( let i = 0; i < _glob.arr.reservations.length; i++) if( _glob.arr.reservations[i].id/1 === reservation.id/1 ) _glob.arr.reservations[i] = reservation
}


/* -----------------------------------------------------------------------------
* add
*/

function addReservation(){
  let arrayReservation = _glob.arr.reservations;
  navActiveItm( 'reservations/add' );
  let output = document.querySelector( '#page_output' );
  $( output ).load( 'templates/add-reservation.html', ()=> {
      let add_form = document.querySelector( '#page_output form' ),
      valid_date = false,
      valid_data = true;
      document.querySelector('button').setAttribute( 'disabled','disabled' ); // disable button
      $('label').hide(); // hide labels (while placeholders are visible)
      $('input.form-control').on( 'change', (event) => {
        $(`label[for="${event.target.id}"]`).fadeIn(); // show label on input change (placeholders are not visible)
      });
      // -----------------------------------------------------------------------
      // date input
      $('input#date').datepicker( { format:'dd-mm-yyyy', startDate: '0' }).on( 'change' , (event) => update_date() );

      let update_date = () => {
        $('#date_feedback').remove()
        $('input#date').after(`<small class="muted feedback" id="date_feedback">${moment($('input#date').val(),'DD-MM-YYYY').format('dddd LL')}</div>`)
      }
      // -----------------------------------------------------------------------
      // time arrival input
      $('input#time_arrival')
        .val( moment().format('LT') )
        .timepicker({
          template: false,
          showInputs: false,
          minuteStep: 5
        })
        .on( 'change' , (event) => {
            update_date();
            $('input#time_depart')
              .val( moment( $('input#time_arrival').val(), 'h:mm a' ).add(3,'hours').format('LT') )
        });
      // -----------------------------------------------------------------------
      // yime depart input
      $('input#time_depart')
        .val (moment( $('input#time_arrival').val(), 'h:mm a' ).add(3,'hours').format('LT') )
        .timepicker({
          template: false,
          showInputs: false,
          minuteStep: 5
        });

      // -----------------------------------------------------------------------
      // table_select
      let chairs=0;
      for( let table of _glob.arr.tables ) chairs +=table.chairs // total amount of chairs

      let table_chairs = ( id ) =>{
        for( let table of _glob.arr.tables ){
          if( table.id === id ){
            return table.chairs; //  amount of chairs per table
          }
        }
      }

      // chairs occupied by reservations
      for( let reservation of _glob.arr.reservations ) for( let table of reservation.table ) chairs -= table_chairs( table );

      // select random unoccupied table
      let table = tableReservation();

      document.querySelector( `select#table_select option[value="${table}"]`).selected = true;
      $( 'label[for="table_select"]').show(); // show label for table select

      // update_header
      let update_header = () => {
        let firstname = document.querySelector( 'input#firstname' ).value,
        preposition = document.querySelector( 'input#preposition' ).value,
        lastname = document.querySelector( 'input#lastname' ).value,
        name,
        table = document.querySelector( `select#table_select` ),
        tables = [],
        count = 0,
        seats = 0;
        if( preposition !== '' ) preposition += ' ';
        name = firstname + ' ' + preposition + lastname;
        let persons = document.querySelector( 'input#persons' ).value;
        if(persons) persons = ' for '+persons+' persons'
        for (let i=0; i<table.options.length; i++) {
          if (table.options[i].selected) {

            tables[count] =table.options[i].value;
            count++;
            seats += getTable(table.options[i].value).chairs
          }
        }

        $( '#page_output h3').html( `Add Reservation <small class="text-muted">for <b>${name}</b>${persons} at table <b>${tables.join('+')}</b> (${seats} seats)<small>`);
      }

      $('input#firstname,input#preposition,input#lastname,input#persons').on( 'keyup', ( event ) => update_header() );
      $('#reservation,#add_options').hide();
      $('input#email,input#telephone').on( 'change', ( event ) => {
        $('#reservation,#add_options').fadeIn();
      });
      $('select#table_select,input#persons').on( 'change', ( event ) => update_header() );
      table = document.querySelector( `select#table_select` );
      for ( let i = 0; i < table.options.length; i++ )  if( isTableReservationOccupied( table.options[i].value ) ) table.options[i].setAttribute('disabled','disabled');

      $('input#persons').on( 'change', ( event ) => {

        if( event.target.value > 0 && event.target.value < chairs ){ // persons is OK
          $( 'input#persons' ).removeClass( 'is-invalid' )//.addClass( 'is-valid' );
          $( '#persons-invalid' ).remove();
          valid_data = true;

          // TODO : we want to select a table with more seats or combine tables
          // ---------------------------------------------------------------------


          let checkPersonsTableSeats = () => {
            let count = 0, seats = 0, tables_arr = [];

            for ( let i = 0; i < table.options.length; i++ ) {
              if (table.options[i].selected) {

                  tables_arr.push(  table.options[i].value/1 );
                  tables[count] =table.options[i].value;
                  count++;
                  seats += getTable(table.options[i].value).chairs;


              }
            }

            let persons = document.querySelector('input#persons').value;

            if( persons > seats ){
              if( !isTableReservationOccupied( tables_arr[tables_arr.length-1]+1 ) ){ // check if next table is occupied
                document.querySelector( `select#table_select option[value="${tables_arr[tables_arr.length-1]+1}"]`).selected = true;
                update_header();
              }else { // next table is occupied; select previous table
                if( !isTableReservationOccupied( tables_arr[tables_arr.length-1]-1 ) ){ // check if previous table is occupied
                  try{
                    document.querySelector( `select#table_select option[value="${tables_arr[tables_arr.length-1]-1}"]`).selected = true;
                    update_header();
                  }catch{

                    let new_table = getTableBySeats( document.querySelector('input#persons').value );


                    document.querySelector( `select#table_select option[value="${new_table}"]`).selected = true;
                    update_header();
                    checkPersonsTableSeats();
                  }
                }else{ // previous table is occupied; select new table and check if it's occupied
                  let new_table = getTableBySeats( document.querySelector('input#persons').value );

                  document.querySelector( `select#table_select option[value="${new_table}"]`).selected = true;
                  checkPersonsTableSeats();
                  //if( !isTableReservationOccupied( tableReservation() ) )
                }
              }
            } else {

            }
          } // checkPersonsTableSeats
          checkPersonsTableSeats();
        }else if (event.target.value > chairs) { // persons more than available seats
          $( '#persons-invalid' ).remove();
          $( 'input#persons' ).removeClass( 'is-valid' ).addClass( 'is-invalid' ).after( '<div class="invalid-feedback" id="persons-invalid">'+(event.target.value/1-chairs)+' more persons than seats available ('+chairs+')</div>' );
          valid_data = false;
        }else{
          $( '#persons-invalid' ).remove();
          $( 'input#persons' ).removeClass( 'is-valid' ).addClass( 'is-invalid' ).after( '<div class="invalid-feedback" id="persons-invalid">Please provide a valid number for persons</div>' );
          valid_data = false;
        }

        if( valid_data ){
          document.querySelector('button').removeAttribute('disabled'); // enable button
        }
      });
      // -----------------------------------------------------------------------
      // form submit
       add_form.addEventListener( 'submit', (event) => {
        event.preventDefault() // prevent form submit
        let reservationId = getRandomInt(10000,99999),
        guest_data = {
          firstname : document.getElementById('firstname').value,
          preposition : document.getElementById('preposition').value,
          lastname : document.getElementById('lastname').value,
          email : document.getElementById('email').value,
          telephone : document.getElementById('telephone').value,
          reservation : reservationId
        },
        _guest = addGuestFromReservation( guest_data ),
        _persons = document.getElementById('persons').value,
        //_timestamp =  document.getElementById('timestamp').value,
        _date = document.getElementById('date').value,
        _time_arrival = document.getElementById('time_arrival').value,
        _time_depart = document.getElementById('time_depart').value,
        _table =  document.getElementById('table').value,
        add_data = {
          id : reservationId,
          guest : _guest,
          persons : _persons,
          //timestamp : _timestamp,
          date : _date,
          time_arrival : _time_arrival,
          time_depart : _time_depart,
          table : _table
        };
        //console.log(add_data)

        if( ! valid_date ){ //invalid date
          bsAlert( '#page_output','warning','','Invalid date' )
          valid_data = false;
        }
        if ( (isNaN(_persons/1)) ) {
          bsAlert( '#page_output','warning','','Persons must be a number' )
          valid_data = false;

        }

        if(valid_data){
           // save reservation to array
           arrayReservation.unshift( add_data );
          _glob.arr.reservations = arrayReservation;
          let reservation_add = new Reservation( add_data );
          console.log(reservation_add);

          let guest_name_prepostion = guest_data.preposition;
          if( guest_name_prepostion !== '') guest_name_prepostion =+ ' ';
          bsAlert( '.page-content','primary','',`Reservation for <b>${guest_data.firstname} ${guest_name_prepostion}${guest_data.lastname}</b> has been saved` )
          overviewReservations();
        }

      });
  });

  $( 'nav#primary a#reservations').addClass( 'active' );
}//

function validateReservation( form, callback ){
  let button = form.querySelector( 'button' );
  $( button ).attr( 'disabled','disabled' )
  $( 'input#date').on( 'change', (event) => {
    button.removeAttribute( 'disabled' )
  })
  $( form ).on( 'submit', (event) => {
    event.preventDefault()
    let valid_data = true;

    if( valid_data ) callback()
  })

}

/* -----------------------------------------------------------------------------
* overview
*/

function overviewReservations(){
  navActiveItm( 'reservations/overview' );
  $( 'nav#primary a#reservations').addClass( 'active' );
  let nav_tab_active = document.querySelector( '.nav-link.active' );
  nav_tab_active.innerText = `Overview`;

  let arrayReservation = _glob.arr.reservations;
  let overview_fields = [
    { label : 'Reservation', field : 'reservation' },
    { label : 'Guest', field : 'guest' },
    { label : 'Persons', field : 'persons' },
    { label : 'Table', field : 'table' },
    { label : '', field : 'options' },
  ]

  let table = document.createElement( 'table' ),
  table_thead = document.createElement( 'thead' ),
  table_tr = document.createElement( 'tr' ),
  output = document.getElementById( 'page_output' );
  table.setAttribute( 'class','table table-hover' )
  for( let field of overview_fields ){
    let table_th = document.createElement( 'th' );
    // TODO : fix (col width jump at row hover) in stylesheet
    if( field.field === 'reservation' || field.field === 'options' || field.field === 'guest'  ) table_th.setAttribute( 'style', 'width:225px;' )
    if( field.field === 'table' || field.field === 'persons' ) table_th.setAttribute( 'style', 'width:50px;' )
    table_th.innerText = field.label;
    table_tr.appendChild( table_th )
  }

  table_thead.appendChild( table_tr );
  table.appendChild( table_thead );

  let table_tbody = document.createElement( 'tbody' );
  for( let item of arrayReservation ) {
    table_tr = document.createElement( 'tr' );

    for( let field of overview_fields ){
      let table_td = document.createElement( 'td' );
      if ( field.field === 'options' ){
        table_td.setAttribute( 'style', 'text-align:right;width:125px;')
        //table_td.appendChild( button_group );
        table_td.appendChild(
          bsBtnGrp([
            bsBtn( 'Edit', 'btn-sm', 'far fa-edit', () => {
              location.hash = `#reservations/update/${item.id}`
            }),
            bsBtn( 'Delete', 'btn-sm', 'fas fa-minus-circle', () => {
              location.hash = `#reservations/delete/${item.id}`
            })
          ])
        )
      }else if (field.field === 'guest') {

        table_td.innerText = getGuestName( item.guest );
        $( table_td ).on( 'click', (event) => {
          location.hash = `#guests/view/${getGuest( item.guest ).id}`
        });
      }else if (field.field === 'reservation' ) {

        table_td.innerText = `${moment(item.date,'DD-MM-YYYY').format('dddd LL')} ${item.time_arrival}-${item.time_depart}`
      }else if (field.field === 'table') {
        table_td.innerText = item.table.join( '+' )
      }else {
        table_td.innerText = item[ field.field ]
      }

      table_tr.appendChild( table_td );
      // TODO ccolombijn : fix (row height jump at hover) in stylesheet
      table_tr.setAttribute( 'style', 'height:56px;')
    }

    table_tbody.appendChild( table_tr )

  }
  table.appendChild( table_tbody )
  output.innerHTML = '';
  output.appendChild( table );

  $( 'table' ).DataTable();
  if( arrayReservation.length < 11 ) $('ul.pagination').hide();

}

/* -----------------------------------------------------------------------------
* update
*/

function updateReservation( id ){
  navTab({
    id : 'update', hashlocation : `#reservations/update/${id}`, icon : '', label : 'Edit Reservation',
    action : () => {
      updateReservation( id )
    }
  })
  let output = document.querySelector( '#page_output' )
  $( output ).load( 'templates/update-reservation.html', () => {
    let form = output.querySelector( 'form'),
    update_reservation = form.elements, reservation = getReservation( id ),
    guest_fields = [ 'firstname', 'preposition', 'lastname', 'email', 'telephone' ];
    for( let field of update_reservation ){
      if( guest_fields.includes( field.id ) ){
        field.setAttribute( 'disabled', 'disabled' )
        let guest = getGuest( reservation.guest )
        field.value = guest[ field.id ]
        for( let guest_field of guest_fields ) if( guest[ guest_field ] === '' ) $( `#col_${guest_field}` ).hide()
        $( 'button#edit_guest' ).on( 'click', (event) => location.hash = `#guest/update/${guest.id}` )
      }else if ( field.id === 'table_select' ) {
        for( let table of reservation.table ) document.querySelector( `select#table_select option[value="${table}"]`).selected = true;
      } else {
        field.value = reservation[ field.id ]
      }
    }
    $( form ).on( 'submit', (event) => {
      event.preventDefault();
      update_reservation = event.target.elements;
      setReservation({
        id : id,
        guest : reservation.guest,
        persons : update_reservation.persons,
        date : update_reservation.date,
        time_arrival : update_reservation.time_arrival,
        time_depart : update_reservation.time_depart,
        table : update_reservation.table
      })
    })
  })
}

/* -----------------------------------------------------------------------------
* view
*/

function viewReservation( id ){
  let reservation = formatReservation( getReservation( id ) ),
  guest = getGuestName( getReservation( id ).guest ),
  output = document.getElementById( 'page_output' )
  navTab({
    id : 'view',
    hashlocation : `#reservations/view/${id}`,
    icon : '',
    label : 'View Reservation',
    action : () => {
      viewReservation( id )
    }
  })
  $( output ).load( 'templates/view-reservation.html', () => {
    $( '#guest' ).html( guest )
    $( '#reservation' ).html( reservation )
    let confirm_button = output.querySelector( 'button' )
    $( confirm_button ).on( 'click', (event) => {
      updateReservation( id )
      navTabRemove( 'view' );
    })
  })
}


/* -----------------------------------------------------------------------------
* delete
*/

function deleteReservation( id ){
  let reservation = formatReservation( getReservation( id ) ),
  guest = getGuestName( getReservation( id ).guest ),
  output = document.getElementById( 'page_output' )
  navTab({
    id : 'delete',
    hashlocation : `#reservations/delete/${id}`,
    icon : 'fas fa-minus-circle',
    label : 'Delete Reservation-',
    action : () => {
      deleteReservation( id )
    }
  })
  $( output ).load( 'templates/delete-reservation.html', () => {
    $( '#guest' ).html( guest )
    $( '#reservation' ).html( reservation )
    let confirm_button = output.querySelector( 'button' )
    $( confirm_button ).on( 'click', (event) => {
      let tmp_arr = [];
      for( let item of _glob.arr.reservations ) if( item.id/1 !== id/1 ) tmp_arr.push( item )
      _glob.arr.reservations = tmp_arr;
      overviewReservations();
      navTabRemove( 'delete' );
      bsAlert( '#page_output', 'primary', '', `Reservation ${reservation} for ${guest} has been deleted` )

    })
  })

}
/* -----------------------------------------------------------------------------
* tables
*/

// TODO : table info from table module

function tableReservation( persons ){
  let reservations_tables = [], // array for current reserved tables
  tables_amount = _glob.arr.tables.length,
  select_table_rand = getRandomInt( 1,tables_amount ), // pick  a random table
  // TODO : check if selected table can host the amount of persons (check seats)
  arrayReservation = _glob.arr.reservations;
  for( let item of arrayReservation ){ // current reserved tables
    reservations_tables.push( item.table )
  }

  // if picked table is reserved, pick another random one...
  while( reservations_tables.includes( select_table_rand ) ){
    select_table_rand = getRandomInt( 1,tables_amount );
  }
  return select_table_rand;
}
/* -----------------------------------------------------------------------------
* format
*/
function formatReservation( reservation ){
  if ( reservation )return `<b>${moment(reservation.date,'DD-MM-YYYY').format('dddd LL')}</b> from <b>${reservation.time_arrival}</b> to <b>${reservation.time_depart}</b> for <b>${reservation.persons}</b> persons at table <b>${reservation.table.join('+')}</b>`
}
