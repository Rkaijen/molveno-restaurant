'use strict'
/*
* assets/js/modules/reservation.js
* TODO : addReservation() - table selection / date/time input & validation
*        https://github.com/Spectrum-McRaj/Restaurant-Hans/issues/8
*        tableReservation()
*        updateReservation() - build form
*                            - populate with data from array
*                            - pointer via location.hash?
*       deleteReservation()  - ''
* decrease amount of code with helpers/tools
*/

function mainReservations(){
  overviewReservations();
}

function getReservation( id ){
  let arrayReservation = _glob.arr.reservations;
  for( let item of arrayReservation ){
    if( item.id === id ) return item;
  }
}


function overviewReservations(){
  navActiveItm( 'reservations/overview' );
  $( 'nav#primary a#reservations').addClass( 'active' );
  let nav_tab_active = document.querySelector( '.nav-link.active' );
  nav_tab_active.innerText = `Overview`;

  let arrayReservation = _glob.arr.reservations;
  let overview_fields = [
    { label : 'Date/Time', field : 'timestamp' },
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
    if( field.field === 'timestamp' || field.field === 'options' || field.field === 'guest'  ) table_th.setAttribute( 'style', 'width:225px;' )
    if( field.field === 'table' || field.field === 'persons' ) table_th.setAttribute( 'style', 'width:50px;' )

    table_th.innerText = field.label;
    table_tr.appendChild( table_th );
  }

  table_thead.appendChild( table_tr );
  table.appendChild( table_thead );

  let table_tbody = document.createElement( 'tbody' );
  for( let item of arrayReservation ) {
    table_tr = document.createElement( 'tr' );

    let button_edit = document.createElement( 'button' );
    button_edit.setAttribute( 'class', 'btn btn-sm' )
    button_edit.innerHTML = '<i class="far fa-edit"></i> Edit';
    button_edit.addEventListener( 'click', (event) => {
      updateReservation( item.id )
    });

    let button_delete = document.createElement( 'button' );
    button_delete.setAttribute( 'class', 'btn btn-sm' )
    button_delete.innerHTML = '<i class="fas fa-minus-circle"></i> Delete';
    button_delete.addEventListener( 'click', (event) => {
      deleteReservation( item.id )
    });

    let button_group = document.createElement( 'div' );
    button_group.setAttribute( 'class','btn-group btn-group-sm' );
    button_group.appendChild( button_edit );
    button_group.appendChild( button_delete );
    for( let field of overview_fields ){
      let table_td = document.createElement( 'td' );
      if ( field.field === 'options' ){ // edit/delete buttons
        table_td.setAttribute( 'style', 'text-align:right;width:125px;')
        table_td.appendChild( button_group );



      }else {
        table_td.innerText = item[ field.field ];
      }

      table_tr.appendChild( table_td );
      // TODO : fix (row height jump at hover) in stylesheet
      table_tr.setAttribute( 'style', 'height:56px;')
    }

    table_tbody.appendChild( table_tr )

  }
  table.appendChild( table_tbody )
  output.innerHTML = '';
  output.appendChild( table );
}

function addReservation(){
  let arrayReservation = _glob.arr.reservations;
  navActiveItm( 'reservations/add' );
  let output = document.querySelector( '#page_output' ), // element for ouput in UI
  add_form = document.createElement( 'form' ), // form element which is added
  reservations = new Reservation, // class instance
  prop_label = reservations.propertyLabels(), // call method of instance for labels input
  add_form_header = document.createElement( 'h3' );
  add_form_header.innerText = 'Add Reservation';
  let add_form_fields = [ // form fields & labels; update to add/remove fields
    { id : 'guest', label : prop_label.guest },
    { id : 'timestamp', label : prop_label.timestamp },
    { id : 'persons', label : prop_label.persons },
    { id : 'table', label : prop_label.table }
  ]
  let valid_date = false;
  for( let field of add_form_fields ){

    if ( field.id === 'table' ) { // TODO : select table(s) for this reservation
  // ---------------------------------------------------------------------------
      // we want at this point to select & combine tables
      // (if the amount of persons requires this)
      // SUGGESTION : calls something like selectTable( persons );
      //  which returns a array of selected available table(s);

      let add_form_field = document.createElement( 'input' ),
      select_table_rand = tableReservation(); // returns random available table
      add_form_field.setAttribute( 'type', 'hidden' )
      add_form_field.setAttribute( 'id', 'table' )

      add_form_field.value = select_table_rand;
      add_form.appendChild( add_form_field );
      let add_form_field_table_label = document.createElement( 'div' ),
      add_form_field_table_val = document.createElement( 'div' ),
      add_form_row = document.createElement( 'div' );
      add_form_row.setAttribute( 'class','row' );


      add_form_field_table_label.setAttribute( 'class', 'col-sm-2' );
      add_form_field_table_label.innerText = 'Tafel'
      add_form_field_table_val.setAttribute( 'class', 'col-sm-10' );
      add_form_field_table_val.innerText = select_table_rand;
      add_form_row.appendChild(add_form_field_table_label );
      add_form_row.appendChild(add_form_field_table_val );
      add_form.appendChild( add_form_row );

    /*}else if ( field.id === 'timestamp' ) {
      TODO : add date / time field which are submitted as timestamp
    */
    }else{
      let add_form_field = document.createElement( 'input' ),
      add_form_field_col = document.createElement( 'div' ),
      add_form_label = document.createElement( 'label' ),
      add_form_row = document.createElement( 'div' );
      // form row
      add_form_row.setAttribute( 'class','form-group row' );
      // label
      add_form_label.innerText = field.label;
      add_form_label.setAttribute( 'class', 'col-sm-2 col-form-label' );
      add_form_label.setAttribute( 'for', field.id );
      add_form_row.appendChild( add_form_label );
      // input
      add_form_field.setAttribute( 'id', field.id );
      add_form_field.setAttribute( 'class', 'form-control');
      add_form_field_col.setAttribute( 'class', 'col-sm-10' )
      add_form_field_col.appendChild( add_form_field );
      add_form_row.appendChild( add_form_field_col );
      add_form.appendChild( add_form_row );



    }

  }

  // date datepicker


  // submit button
  let button_submit = document.createElement( 'button' ),
  add_form_row = document.createElement( 'div' );
  add_form_row.setAttribute( 'class','row' );
  add_form_row.setAttribute( 'style','padding:10px;' );
  button_submit.setAttribute( 'class', 'btn ')
  button_submit.innerText = 'Add Reservation';
  add_form_row.appendChild( button_submit )
  add_form.appendChild( add_form_row )

  output.innerHTML  = ''; // clear output
  output.appendChild( add_form_header );
  output.appendChild( add_form ); // append form to output

  $('input#timestamp').datepicker( { format:'mm/dd/yyyy' }).on( 'change' , (event) =>{
    // check date, if valid; valid_date = true
    let date = new Date(event.target.value);
    var today = new Date();
    if ((date.getTime()>=today.getTime())){
      valid_date = true;
      $('input#timestamp').removeClass('is-invalid').addClass('is-valid');
      $('#date-invalid').remove();
    }else{
      $('input#timestamp').removeClass('is-valid').addClass('is-invalid').after('<div class="invalid-feedback" id="date-invalid">Please provide a valid date for this reservation</div>');
      valid_date = false;
    }
  });

  // form submit
  add_form.addEventListener( 'submit', (event) => {
    event.preventDefault() // prevent form submit
    //let add_data = new FormData( add_form ); // get data from form
    let _guest = document.getElementById('guest').value;
    let _persons = document.getElementById('persons').value;
    let _timestamp =  document.getElementById('timestamp').value;
    let _table =  document.getElementById('table').value;
    let add_data = {
      guest : _guest,
      persons : _persons,
      timestamp : _timestamp,
      table : _table
    }
    console.log(add_data)
    let valid_data = true;
    if( ! valid_date ){ //invalid date
      bsAlert( '#page_output','warning','','Invalid date' )
      $('input#timestamp').addClass( 'is-invalid' ).after('<div class="invalid-feedback" id="date-invalid">Please provide a valid date for this reservation</div>');
      valid_data = false;
    }
    if (!(typeof (persons/1) === 'number')) {
        bsAlert( '#page_output','warning','','Persons must be a number' )
          $('input#persons').addClass( 'is-invalid' ).after('<div class="invalid-feedback" id="persons-invalid">Please provide a number for persons</div>').on( 'keyup', (event) => {
            console.log( event.target.value/1)
            if( !isNaN(event.target.value) && event.target.value !== '' ){
              $('input#persons').removeClass('is-invalid').addClass( 'is-valid' );
              $('#persons-invalid').remove();
              valid_data = true;
            }
          });
          valid_data = false;


    }
    if(valid_data){ // valid data; save to array



      add_data[ 'id' ] = getRandomInt(1000,9999); // generate & assign random int as id
      arrayReservation.push( add_data ); // save reservation to array
      _glob.arr.reservations = arrayReservation;
      let reservation_add = new Reservation( add_data );
      //
      location.hash = '#reservations'
      bsAlert( '.page-content','primary','',`Reservation for <b>${add_data.guest}</b> has been saved` )
      //overviewReservations();
    }

  });
  $( 'nav#primary a#reservations').addClass( 'active' );
}



function updateReservation( id ){

  let output = document.querySelector( '#page_output' ), // element for ouput in UI
  update_form = document.createElement( 'form' );
  update_form.addEventListener( 'submit', (event) => {
    new Reservation()
  });
}

function deleteReservation( id ){
  //location.hash = `#reservations/delete/${id}`
  let arrayReservation = _glob.arr.reservations;
  let reservation_data = getReservation( id );
  let output = document.getElementById( 'page_output' );
  let container_confirm = document.createElement( 'div' );
  let nav_tab_active = document.querySelector( '.nav-link.active' );
  if (nav_tab_active) nav_tab_active.innerText = `Delete Reservation`
  container_confirm.setAttribute( 'style', 'padding:25px')
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
  button_confirm.setAttribute( 'class', 'btn' )
  button_confirm.setAttribute( 'style', 'margin-right:5px;')
  button_confirm.innerText = 'Delete';
  button_confirm.addEventListener( 'click', (event) => {
    /*for( let i = 0; i < arrayReservation.length-1; i++){
      if ( arrayReservation[i].id === id) {
        arrayReservation.splice(i, 1);
      }
    } */
    let tmp_arr = [];
    for( let item of arrayReservation ){
      if( item.id !== id ){
        tmp_arr.push( item )
      }

    }
    arrayReservation = tmp_arr;
    _glob.arr.reservations = arrayReservation;
    overviewReservations();
    nav_tab_active.innerText = 'Overview'
    bsAlert( '#page_output', 'primary', '', `Reservation of Guest <b>${reservation_data.guest}</b> at ${reservation_data.timestamp} has been deleted` )
  });
  container_confirm.appendChild( button_confirm );

  // cancel
  let button_cancel = document.createElement( 'button' );
  button_cancel.setAttribute( 'class', 'btn ' )
  button_cancel.innerText = 'Cancel';
  button_cancel.addEventListener( 'click', (event) => {
    overviewReservations();
    nav_tab_active.innerText = 'Overview'
  });
  container_confirm.appendChild( button_cancel );

  output.innerHTML = '';
  output.appendChild( container_confirm );

}
function tableReservation( persons ){
  let reservations_tables = [], // array for current reserved tables
  tables_amount = _glob.arr.tables.length,
  select_table_rand = getRandomInt( 1,tables_amount ), // pick  a random table
  // TODO : check if selected table can host the amount of persons (check seats)
  arrayReservation = _glob.arr.reservations;
  for( let item of arrayReservation ){ // current reserved tables
    reservations_tables.push( item.table )
  }

  // check if picked table is reserved, if so pick another random one...
  while( reservations_tables.includes( select_table_rand ) ){
    select_table_rand = getRandomInt( 1,tables_amount );
  }
  return select_table_rand;
}

function dateDiffDays( start, end ) {
 return Math.ceil( Math.abs( ( new Date( start ) ).getTime() - ( new Date( end ) ).getTime()  ) / (1000 * 3600 * 24) ); // aantal dagen
}

function $date( date ){
  let d = date === undefined ? new Date() : new Date( date );
  let dd = d.getDate();
  let mm = d.getMonth()+1;
  let yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
