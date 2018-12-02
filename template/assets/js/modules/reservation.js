'use strict'
/*
* assets/js/modules/reservation.js
* TODO ccolombijn : addReservation() - table selection / date/time input & validation
*
*        tableReservation()
*        updateReservation() - build form
*                            - populate with data from array
*                            - pointer via location.hash?
*       deleteReservation()  - ''
* decrease amount of code with helpers/tools
* integration REST API
*/

function mainReservations(){
  overviewReservations();
}

function getReservation( id ){
  for( let reservation of _glob.arr.reservations ){
    if( reservation.id === id ) return reservation
  }
}

function setReservation( reservation ){
  for(let i = 0; i < _glob.arr.reservations.length; i++){
    if( _glob.arr.reservations[i].id === reservation.id ) _glob.arr.reservations[i] = reservation
  }
}
/* -----------------------------------------------------------------------------
* add
*/
function addReservation(){
  let arrayReservation = _glob.arr.reservations;
  navActiveItm( 'reservations/add' );
  let output = document.querySelector( '#page_output' ); // element for ouput in UI
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
    // options buttons


    let button_edit = document.createElement( 'button' );
    button_edit.setAttribute( 'class', 'btn btn-sm' )
    button_edit.innerHTML = '<i class="far fa-edit"></i> Edit';
    button_edit.addEventListener( 'click', (event) => {
      updateReservation( item.id )
      // TODO ccolombijn : make pageloader id endpoint work
      //location.hash = `#reservations/update/${item.id}`
    });

    let button_delete = document.createElement( 'button' );
    button_delete.setAttribute( 'class', 'btn btn-sm' )
    button_delete.innerHTML = '<i class="fas fa-minus-circle"></i> Delete';
    button_delete.addEventListener( 'click', (event) => {
      deleteReservation( item.id )
      // TODO ccolombijn : make pageloader id endpoint work
      //location.hash = `#reservations/delete/${item.id}`;
    });

    let button_group = document.createElement( 'div' );
    button_group.setAttribute( 'class','btn-group btn-group-sm' );
    button_group.appendChild( button_edit );
    button_group.appendChild( button_delete );


    for( let field of overview_fields ){
      let table_td = document.createElement( 'td' );
      if ( field.field === 'options' ){
        table_td.setAttribute( 'style', 'text-align:right;width:125px;')
        table_td.appendChild( button_group );
      }else if (field.field === 'guest') {
        let firstname = getGuest( item.guest ).firstname,
        preposition = getGuest( item.guest ).preposition,
        lastname = getGuest( item.guest ).lastname;

        if( preposition !== '' ) preposition =+ ' ';
        table_td.innerText = `${firstname} ${preposition}${lastname}`;
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
function _updateReservation( id ){
  let output = document.querySelector( '#page_output' )
  $( output ).load( 'templates/update-reservation.html', () => {
    let form = document.querySelector( '#page_output form'),
    update_reservation = form.elements,
    reservation = getReservation( id ),
    guest_fields = [ 'firstname', 'preposition', 'lastname', 'email', 'telephone' ];
    for( let field of update_reservation ){
      if( guest_fields.contains( field.id ) ){
        field.setAttribute( 'disabled', 'disabled' )
        let guest = getGuest( reservation.guest )
        field.value = guest[ field.id ]
      }else if ( field.id === 'table' ) {
        for( let table of reservation.table ) document.querySelector( `select#table_select option[value="${table}"]`).selected = true;
      } else {
        field.value = reservation[ field.id ]
      }
    }
    $( form ).on( 'submit', (event) => {
      event.preventDefault;
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

function updateReservation( id ){
  let arrayReservation = _glob.arr.reservations;
  navActiveItm( 'reservations/add' );
  let output = document.querySelector( '#page_output' ),
  update_form = document.createElement( 'form' ),
  reservations = new Reservation,
  prop_label = reservations.propertyLabels(),
  update_form_header = document.createElement( 'h3' );
  update_form_header.innerText = 'Edit Reservation';
  update_form.appendChild( update_form_header )
  let update_form_fields = [
    { id : 'guest', label : prop_label.guest },
    { id : 'timestamp', label : prop_label.timestamp },
    { id : 'persons', label : prop_label.persons },
    { id : 'table', label : prop_label.table }
  ]
  $('a.nav-link').removeClass('active');
  $('#nav_tab_edit').remove();
  let nav_tab_update = document.createElement( 'li' );
  nav_tab_update.setAttribute( 'class', 'nav-item' );
  nav_tab_update.setAttribute( 'id', 'nav_tab_edit' );
  nav_tab_update.innerHTML = '<a href="#" class="nav-link active"><i class="fas fa-edit"></i> Edit Reservation</a> ';
  nav_tab_update.addEventListener( 'click', (event) => {
    updateReservation( id )
  });
  let nav_tabs = document.querySelector( 'ul.nav-tabs');
  nav_tabs.appendChild( nav_tab_update );
  let reservation = getReservation( id );

  for( let field of update_form_fields ){

    let update_form_field = document.createElement( 'input' ),
    update_form_field_col = document.createElement( 'div' ),
    update_form_label = document.createElement( 'label' ),
    update_form_row = document.createElement( 'div' );

    update_form_row.setAttribute( 'class','form-group row' );

    update_form_label.innerText = field.label;
    update_form_label.setAttribute( 'class', 'col-sm-2 col-form-label' );
    update_form_label.setAttribute( 'for', field.id );
    update_form_row.appendChild( update_form_label );

    update_form_field.setAttribute( 'id', field.id );
    update_form_field.setAttribute( 'class', 'form-control');
    update_form_field.value = reservation[ field.id ];
    update_form_field_col.setAttribute( 'class', 'col-sm-10' )

    update_form_field_col.appendChild( update_form_field );
    update_form_row.appendChild( update_form_field_col );
    update_form.appendChild( update_form_row );



  }

  let button_update = document.createElement( 'button' ),
  update_form_row = document.createElement( 'div' );
  update_form_row.setAttribute( 'class','row' );
  update_form_row.setAttribute( 'style','padding:10px;' );
  button_update.setAttribute( 'class', 'btn ')
  button_update.innerText = 'Update Reservation';
  update_form_row.appendChild( button_update );
  update_form.appendChild( update_form_row );


  update_form.addEventListener( 'submit', (event) => {
    event.preventDefault() // prevent form submit
    let reservation = event.target.elements;

    let update_data = {
      guest : reservation.guest,
      persons : reservation.persons,
      timestamp : _timestamp,
      table : _table
      //hasPaid : _hasPaid
    }
    update_data[ 'id' ] = id;
    $('#nav_tab_edit').remove();

    setReservation(update_data)
    bsAlert( '.page-content','primary','',`Reservation for <b>${update_data.guest}</b> has been saved` )
    overviewReservations();
  });

  output.innerHTML = '';
  output.appendChild( update_form );


}

/* -----------------------------------------------------------------------------
* view
*/

function viewReservation( id ){
  let arrayReservation = _glob.arr.reservations;
  let output = document.querySelector( '#page_output' ), // element for ouput in UI
  view = document.createElement( 'div' ),
  reservations = new Reservation, // class instance
  prop_label = reservations.propertyLabels(), // call method of instance for labels input
  view_header = document.createElement( 'h3' );
  view_header.innerText = 'View Reservation';
  view.appendChild( view_header )
  $('a.nav-link').removeClass('active');
  $('#nav_tab_view').remove();
  let nav_tab_view = document.createElement( 'li' );
  nav_tab_view.setAttribute( 'class', 'nav-item' );
  nav_tab_view.setAttribute( 'id', 'nav_tab_delete' );
  nav_tab_view.innerHTML = '<a href="#" class="nav-link active"> View Reservation</a> ';
  console.log( id )
}


/* -----------------------------------------------------------------------------
* delete
*/

function deleteReservation( id ){
  //location.hash = `#reservations/delete/${id}`
  let arrayReservation = _glob.arr.reservations; // get array data
  let reservation_data = getReservation( id ); // get current reservation data
  let output = document.getElementById( 'page_output' ); // element for output in UI
  let container_confirm = document.createElement( 'div' ); // element for confirmation in UI
  //let nav_tab_active = document.querySelector( '.nav-link.active' ); // current active tab
  //if (nav_tab_active) nav_tab_active.innerText = `Delete Reservation` // set text of current tab
  $('a.nav-link').removeClass('active');
  $('#nav_tab_delete').remove();
  let nav_tab_delete = document.createElement( 'li' );
  nav_tab_delete.setAttribute( 'class', 'nav-item' );
  nav_tab_delete.setAttribute( 'id', 'nav_tab_delete' );
  nav_tab_delete.innerHTML = '<a href="#reservations/delete" class="nav-link active"><i class="fas fa-minus-circle"></i> Delete Reservation</a> ';

  //nav_tab_delete.innerHTML = '<a href="#" class="nav-link active">Delete Reservation</a> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  nav_tab_delete.addEventListener( 'click', (event) => {
    deleteReservation( id );
  });
  let nav_tabs = document.querySelector( 'ul.nav-tabs');
  nav_tabs.appendChild( nav_tab_delete );
  container_confirm.setAttribute( 'style', 'padding:25px') // TODO : fix this in stylesheet
  //header
  let header_confirm = document.createElement('h3');
  header_confirm.innerText = 'Confirm Delete Reservation';
  container_confirm.appendChild( header_confirm );

  // question
  let question_confirm = document.createElement( 'p' );
  question_confirm.innerText = 'Are you sure you want to delete this reservation?';
  container_confirm.appendChild( question_confirm );

  // details
  let details = document.createElement( 'div' );
  details.innerHTML = `<h4>Guest : ${reservation_data.guest}</h4>`
  details.innerHTML += `<p>Time : ${reservation_data.timestamp}</p>`
  details.innerHTML += `<p>Table : ${reservation_data.table}</p>`
  container_confirm.appendChild( details );

  // confirm
  let button_confirm = document.createElement( 'button' );
  button_confirm.setAttribute( 'class', 'btn btn-dark' )
  button_confirm.setAttribute( 'style', 'margin-right:5px;')
  button_confirm.innerText = 'Delete';
  button_confirm.addEventListener( 'click', (event) => {

    let tmp_arr = [];
    for( let item of arrayReservation ){
      if( item.id !== id ){ // remove by exclusion
        tmp_arr.push( item )
      }

    }
    arrayReservation = tmp_arr;
    _glob.arr.reservations = arrayReservation; // save data to array
    overviewReservations();
    //location.hash = 'reservations'

    nav_tabs.removeChild( nav_tab_delete );
    //nav_tab_active.innerText = 'Overview'
    // alert user something has happened
    bsAlert( '#page_output', 'primary', '', `Reservation of Guest <b>${reservation_data.guest}</b> at ${reservation_data.timestamp} has been deleted` )

  });
  container_confirm.appendChild( button_confirm );

  // cancel
  let button_cancel = document.createElement( 'button' );
  button_cancel.setAttribute( 'class', 'btn ' )
  button_cancel.innerText = 'Cancel';
  button_cancel.addEventListener( 'click', (event) => {
    overviewReservations();
    //location.hash = 'reservations'

    nav_tabs.removeChild( nav_tab_delete );
    //nav_tab_active.innerText = 'Overview'

  });
  container_confirm.appendChild( button_cancel );

  output.innerHTML = '';
  output.appendChild( container_confirm );

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
function selectTableReservation( id ){

}

/* -----------------------------------------------------------------------------
* payments
*/

function hasPaidReservation(setBool, id){
  console.log("has paid " + setBool);
  let currentReservation = getReservation(id);
  console.log("1" + currentReservation.hasPaid);
  currentReservation.hasPaid = setBool;
  console.log("2" + currentReservation.hasPaid);
  setReservation(currentReservation);
  overviewReservations();
}
