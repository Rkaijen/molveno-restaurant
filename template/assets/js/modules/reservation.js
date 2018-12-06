'use strict'
/*
* assets/js/modules/reservation.js
* TODO ccolombijn : addReservation() - table selection / date/time input & validation
*
*
* integration REST API
*/

function mainReservations(){
  overviewReservations()
}

function getReservation( id ){
  for( let reservation of _glob.arr.reservations ) {
    if( reservation.id/1 === id/1 ) return reservation
  }
}

function setReservation( reservation ){
  for( let i = 0; i < _glob.arr.reservations.length; i++) {
    if( _glob.arr.reservations[i].id/1 === reservation.id/1 ) _glob.arr.reservations[i] = reservation
  }
  return reservation
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

      $('input#date').datepicker( { format:'dd-mm-yyyy', startDate: '0' }).on( 'change' , (event) => update_date() );

      let update_date = () => {
        $('#date_feedback').remove()
        $('input#date').after(`<small class="muted feedback" id="date_feedback">${moment($('input#date').val(),'DD-MM-YYYY').format('dddd LL')}</div>`)
      }

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
        })

      $('input#time_depart')
        .val (moment( $('input#time_arrival').val(), 'h:mm a' ).add(3,'hours').format('LT') )
        .timepicker({
          template: false,
          showInputs: false,
          minuteStep: 5
        })
      let chairs=0;
      for( let table of _glob.arr.tables ) chairs +=table.chairs
      let table_chairs = ( id ) => {
        for( let table of _glob.arr.tables ) if( table.id/1 === id/1 ) return table.chairs
      }
      for( let reservation of _glob.arr.reservations ) for( let table of reservation.table ) chairs -= table_chairs( table )
      let table = tableReservation()
      document.querySelector( `select#table_select option[value="${table}"]`).selected = true
      $( 'label[for="table_select"]').show()
      let update_header = () => {
        let firstname = document.querySelector( 'input#firstname' ).value,
        preposition = document.querySelector( 'input#preposition' ).value,
        lastname = document.querySelector( 'input#lastname' ).value,
        name,
        table = document.querySelector( `select#table_select` ),
        tables = [],
        count = 0,
        seats = 0;
        if( preposition !== '' ) preposition += ' '
        name = firstname + ' ' + preposition + lastname;
        let persons = document.querySelector( 'input#persons' ).value;
        if( persons ) persons = ` for ${persons} persons`
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
      $('select#table_select,input#persons').on( 'change', ( event ) => update_header() )
      table = document.querySelector( `select#table_select` )
      for ( let i = 0; i < table.options.length; i++ ) {
        if( isTableReservationOccupied( table.options[i].value ) ) {
          table.options[i].setAttribute( 'disabled', 'disabled' )
          table.options[i].innerHTML = table.options[i].innerHTML + ' ( reserved ) '
        } else {
          table.options[i].innerHTML = table.options[i].innerHTML + ' (' + getTable( table.options[i].value).chairs + ' seats )'
        }
      }

      $('input#persons').on( 'change', ( event ) => {

        if( event.target.value > 0 && event.target.value < chairs ){
          $( 'input#persons' ).removeClass( 'is-invalid' )
          $( '#persons-invalid' ).remove();
          valid_data = true;

          // TODO : we want to select a table with more seats or combine tables
          // ---------------------------------------------------------------------


          let checkPersonsTableSeats = () => {
            let seats = 0, tables_arr = []
            for ( let i = 0; i < table.options.length; i++ ) {
              if (table.options[i].selected) {
                  tables_arr.push(  table.options[i].value/1 )
                  seats += getTable(table.options[i].value).chairs
              }
            }

            let persons = document.querySelector('input#persons').value;
            if( persons > seats ){
              if( !isTableReservationOccupied( tables_arr[tables_arr.length-1]+1 ) ){
                try{
                  document.querySelector( `select#table_select option[value="${tables_arr[tables_arr.length-1]+1}"]`).selected = true;
                  update_header()
                }catch (error){
                  let new_table = getTableBySeats( document.querySelector('input#persons').value )
                  document.querySelector( `select#table_select option[value="${new_table}"]`).selected = true;
                  update_header()
                  checkPersonsTableSeats()
                }
              }else {
                if( !isTableReservationOccupied( tables_arr[tables_arr.length-1]-1 ) ){
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
                  checkPersonsTableSeats()
                }
              }
            } else {

            }
          } // checkPersonsTableSeats
          checkPersonsTableSeats()
        }else if (event.target.value > chairs) {
          $( '#persons-invalid' ).remove();
          $( 'input#persons' ).removeClass( 'is-valid' ).addClass( 'is-invalid' ).after( '<div class="invalid-feedback" id="persons-invalid">'+(event.target.value/1-chairs)+' more persons than seats available ('+chairs+')</div>' );
          valid_data = false;
        }else{
          $( '#persons-invalid' ).remove();
          $( 'input#persons' ).removeClass( 'is-valid' ).addClass( 'is-invalid' ).after( '<div class="invalid-feedback" id="persons-invalid">Please provide a valid number for persons</div>' );
          valid_data = false;
        }

        if( valid_data ){
          document.querySelector('button').removeAttribute('disabled');
        }
      });
      $( add_form ).on( 'submit', (event) => {
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
        _date = document.getElementById('date').value,
        _time_arrival = document.getElementById('time_arrival').value,
        _time_depart = document.getElementById('time_depart').value,
        _table =  document.getElementById('table').value,
        add_data = {
          id : reservationId,
          guest : _guest,
          persons : _persons,
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

           _glob.arr.reservations.unshift( add_data )
          let reservation_add = new Reservation( add_data );


          let guest_name_prepostion = guest_data.preposition;
          if( guest_name_prepostion !== '') guest_name_prepostion =+ ' '
          bsAlert( '.page-content','primary','',`Reservation for <b>${guest_data.firstname} ${guest_name_prepostion}${guest_data.lastname}</b> has been saved` )
          overviewReservations()
        }

      });
  });

  $( 'nav#primary a#reservations').addClass( 'active' );
}//

function _addReservation(){
  let output = document.querySelector( '#page_output' )
  $( output ).load( 'templates/add-reservation.html', () => {
    let add_form = output.querySelector( 'form' )
    validateReservation( add_form, () => {
      add_reservation = add_form.elements;
      let add_reservation_id = getRandomInt(10000,99999),
      add_guest_data = {
        firstname : add_reservation.firstname.value,
        preposition : add_reservation.preposition.value,
        lastname : add_reservation.lastname.value,
        email : add_reservation.email.value,
        telephone : add_reservation.telephone.value,
        reservation : add_reservation_id
      },
      add_reservation_data = {
        id : add_reservation_id,
        guest : addGuestFromReservation( add_guest_data ),
        persons : add_reservation.persons.value,
        date : add_reservation.date.value,
        time_arrival : add_reservation.time_arrival.value,
      }
      _glob.arr.reservations.unshift( add_reservation_data )
    })
  })
}

function validateReservationDate( form ){
  let reservation = form.elements,
  update_date = () => {
    $('#date_feedback').remove()
    $('input#date').after(`<small class="muted feedback" id="date_feedback">${moment($('input#date').val(),'DD-MM-YYYY').format('dddd LL')}</small>`)
  }
  $( reservation.date )
    .datepicker( { format:'dd-mm-yyyy', startDate: '0' } )
    .on( 'change' , (event) => update_date() )

  $( reservation.time_arrival )
    .val( moment().format('LT') )
    .timepicker({
      template: false,
      showInputs: false,
      minuteStep: 5
    })
    .on( 'change' , (event) => {
        update_date()
        $( reservation.time_depart )
          .val(
            moment( $( reservation.time_arrival ).val(), 'h:mm a' )
            .add(3,'hours').format('LT')
          )
    })

  $( reservation.time_depart )
    .val (
      moment( $( reservation.time_arrival ).val(), 'h:mm a' )
      .add(3,'hours').format('LT')
    )
    .timepicker({
      template: false,
      showInputs: false,
      minuteStep: 5
    })
}
function validateReservationTable(){
  if( location.hash.split( '/')[2] ){ // update?

  }
}
function validateReservation( form, callback ){
  let button = form.querySelector( 'button' ),
  reservation = form.elements,
  valid_data = true,
  is_valid = (  input, valid, msg ) => {
    $( `#${input.id}-invalid` ).remove()
    if( valid ) {
      $( input ).removeClass( 'is-invalid' )
    } else {
      $( input ).removeClass( 'is-valid' ).addClass( 'is-invalid' )
      .after( `<div class="invalid-feedback" id="${input.id}-invalid">${msg}</div>` )
    }
  }


  $( 'label' ).hide()
  $( 'input.form-control' ).on( 'change', (event) => {
    $( `label[for="${event.target.id}"]` ).fadeIn()
  })


  $( button ).attr( 'disabled','disabled' )
  validateReservationDate( form )
  $( 'input#date').on( 'change', (event) => {
    if( valid_data ) button.removeAttribute( 'disabled' )
  })

  $( form ).on( 'submit', (event) => {
    event.preventDefault()


    if( valid_data ) callback()
  })

}

/* -----------------------------------------------------------------------------
* overview
*/

function overviewReservations(){
  //if(location.hash !== '#reservations/overview') location.hash = '#reservations/overview'
  navActiveItm( 'reservations/overview' )
  $( 'nav#primary a#reservations').addClass( 'active' )
  let nav_tab_active = document.querySelector( '.nav-link.active' )
  nav_tab_active.innerHTML = `<i class="fas fa-list"></i> Overview`
  let arrayReservation = _glob.arr.reservations;
  let overview_fields = [
    { label : '<i class="far fa-calendar"></i> Reservation', field : 'reservation' },
    { label : '<i class="fas fa-user"></i> Guest', field : 'guest' },
    { label : 'Persons', field : 'persons' },
    { label : 'Table', field : 'table' },
    { label : '', field : 'options' },
  ]
  let table = document.createElement( 'table' ),
  table_thead = document.createElement( 'thead' ),
  table_tr = document.createElement( 'tr' ),
  output = document.getElementById( 'page_output' )
  table.setAttribute( 'class','table table-hover' )
  for( let field of overview_fields ){
    let table_th = document.createElement( 'th' )
    // TODO : fix (col width jump at row hover) in stylesheet

    if( field.field === 'options' || field.field === 'reservation'  ) table_th.setAttribute( 'style', 'width:250px;' )

    table_th.innerHTML = field.label;
    table_tr.appendChild( table_th )
  }
  table_thead.appendChild( table_tr )
  table.appendChild( table_thead )
  let table_tbody = document.createElement( 'tbody' )
  for( let item of arrayReservation ) {
    table_tr = document.createElement( 'tr' )
    for( let field of overview_fields ){
      let table_td = document.createElement( 'td' )
      if ( field.field === 'options' ){
        table_td.setAttribute( 'style', 'text-align:right;' )
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
        table_td.innerText = getGuestName( item.guest )
        $( table_td ).on( 'click', (event) => {
          location.hash = `#guests/view/${getGuest( item.guest ).id}`
        })
      }else if (field.field === 'reservation' ) {
        table_td.innerHTML = `<a href="#reservations/view/${item.id}"><b> ${moment(item.date,'DD-MM-YYYY').format('dddd LL')} </b><br><i class="far fa-clock"></i> ${item.time_arrival}-${item.time_depart}</a>`

      }else if (field.field === 'table') {
        table_td.innerText = item.table.join( '+' )
      }else {
        table_td.innerText = item[ field.field ]
      }
      table_tr.appendChild( table_td );
      table_tr.setAttribute( 'style', 'height:56px;') // TODO ccolombijn : fix (row height jump at hover) in stylesheet
    }
    table_tbody.appendChild( table_tr )
  }
  table.appendChild( table_tbody )
  output.innerHTML = ''
  output.appendChild( table )

  $( 'table' ).DataTable()
  if( arrayReservation.length < 11 ) $('ul.pagination').hide()

}

/* -----------------------------------------------------------------------------
* update
*/

function updateReservation( id ){
  navTab({
    id : 'update',
    href : `#reservations/update/${id}`,
    icon : 'far fa-edit',
    label : 'Edit Reservation'

  })
  let output = document.querySelector( '#page_output' )
  $( output ).load( 'templates/update-reservation.html', () => {
    let form = output.querySelector( 'form'),
    update_reservation = form.elements, reservation = getReservation( id ),
    guest_fields = [ 'firstname', 'preposition', 'lastname', 'email', 'telephone' ]
    for( let field of update_reservation ){
      if( guest_fields.includes( field.id ) ){
        field.setAttribute( 'disabled', 'disabled' )
        let guest = getGuest( reservation.guest )
        field.value = guest[ field.id ]
        for( let guest_field of guest_fields ) if( guest[ guest_field ] === '' ) $( `#col_${guest_field}` ).hide()
        $( '#edit_guest' ).attr( 'href', `#guests/update/${guest.id}` )
      }else if ( field.id === 'table_select' ) {
        for( let table of reservation.table ) document.querySelector( `select#table_select option[value="${table}"]`).selected = true
      } else {
        field.value = reservation[ field.id ]
      }
    }
    $( form ).on( 'submit', (event) => {
      event.preventDefault()
      update_reservation = event.target.elements;

      let set_reservation = setReservation({
        id : id,
        guest : reservation.guest,
        persons : update_reservation.persons.value,
        date : update_reservation.date.value,
        time_arrival : update_reservation.time_arrival.value,
        time_depart : update_reservation.time_depart.value,
        table : $( update_reservation.table_select ).val()
      })

      navTabRemove( 'update' )
      bsAlert( '.page-content', 'primary', '', `Reservation for ${getGuestName(reservation.guest)} on ${formatReservation(set_reservation)} has been updated`,()=>{
        location.hash = '#reservations/overview'
      })

    })
    $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'update' ) )
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
    href : `#reservations/view/${id}`,
    icon : 'far fa-calendar',
    label : 'View Reservation'
  })
  $( output ).load( 'templates/view-reservation.html', () => {
    $( '#guest' ).html( guest )
    $( '#reservation' ).html( reservation )
    let edit_button = output.querySelector( 'a.btn-edit' )
    edit_button.setAttribute( 'href', `#reservations/update/${id}` )
    let delete_button = output.querySelector( 'a.btn-delete' )
    delete_button.setAttribute( 'href', `#reservations/delete/${id}` )
    $( 'a.btn-overview,a.btn-edit,a.btn-delete' ).on( 'click', () => navTabRemove( 'view' ) )

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
    href : `#reservations/delete/${id}`,
    icon : 'fas fa-minus-circle',
    label : 'Delete Reservation'
  })
  $( output ).load( 'templates/delete-reservation.html', () => {
    $( '#guest' ).html( guest )
    $( '#reservation' ).html( reservation )
    let confirm_button = output.querySelector( 'button' )
    $( confirm_button ).on( 'click', (event) => {
      let tmp_arr = [];
      for( let item of _glob.arr.reservations ) if( item.id/1 !== id/1 ) tmp_arr.push( item )
      _glob.arr.reservations = tmp_arr;
      overviewReservations()
      navTabRemove( 'delete' )
      bsAlert( '#page_output', 'primary', '', `Reservation for <b>${guest}</b> ${reservation} has been deleted` )

    })
    $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'delete' ) )
  })

}
/* -----------------------------------------------------------------------------
* tables
*/

// TODO : table info from table module

function tableReservation( persons ){
  let reservations_tables = [], table_rand = getRandomInt( 1,_glob.arr.tables.length );
  for( let item of _glob.arr.reservations ) reservations_tables.push( item.table )
  while( reservations_tables.includes( table_rand ) ) table_rand = getRandomInt( 1,_glob.arr.tables.length )
  return table_rand
}
/* -----------------------------------------------------------------------------
* format
*/
function formatReservation( reservation ){
  if ( reservation ) return `<b>${moment(reservation.date,'DD-MM-YYYY').format('dddd LL')}</b> from <b>${reservation.time_arrival}</b> to <b>${reservation.time_depart}</b> for <b>${reservation.persons}</b> persons at table <b>${reservation.table.join('+')}</b>`
}
