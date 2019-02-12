'use strict'
/*
* assets/js/modules/table.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/
const table = (function(){

/* -----------------------------------------------------------------------------
* main
*/
  let mainTables = () => {
    overviewTables()
  }

/* -----------------------------------------------------------------------------
* add
*/
  function addTable(){
    let output = document.querySelector( '#page_output' )
    $( 'nav#primary a#tables').addClass( 'active' )
    $( output ).load( 'templates/add-table.html', () => {
      let add_form = output.querySelector( 'form' )
      validateTable( add_form, () => {
        let add_table = add_form.elements;
        let add_table_data = {
          id : getRandomInt( 0, 99999 ),
          nr : add_table.nr.value,
          chairs : add_table.chairs.value,
          wheelchair : add_table.wheelchair.value,
          status : add_table.table_status.value
        }
        _glob.arr.tables.unshift( add_table_data )
        console.log( _glob.arr.tables )

        navTabRemove( 'update' )
        bsAlert( 'article.page-content', 'primary', '', `Table <b>${add_table_data.nr}</b>  saved`,()=>{
          location.hash = '#tables/overview'
        })
      })
      $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'update' ) )
    })

  }


  /* -----------------------------------------------------------------------------
  * Overview
  */
  let overviewTables = () => {
    //if(location.hash !== '#reservations/overview') location.hash = '#reservations/overview'
    $( 'nav#primary a#tables').addClass( 'active' )
    let nav_tab_active = document.querySelector( '.nav-link.active' )
    nav_tab_active.innerHTML = `<i class="fas fa-list"></i> Overview`
    let arrayTables = _glob.arr.tables;
    let overview_fields = [
      { label : 'Table number', field : 'nr' },
      { label : '<i class="fas fa-chair"></i> Chairs', field : 'chairs' },
      { label : '<i class="fab fa-accessible-icon"></i> Wheelchair access', field : 'wheelchair' },
      { label : 'Status', field : 'status' },
      { label : '', field : 'options' },
    ]
    let datatable = document.createElement( 'table' ),
    datatable_thead = document.createElement( 'thead' ),
    datatable_tr = document.createElement( 'tr' ),
    output = document.getElementById( 'page_output' )
    datatable.setAttribute( 'class','table table-hover' )
    for( let field of overview_fields ){
      let datatable_th = document.createElement( 'th' )
      // TODO : fix (col width jump at row hover) in stylesheet

      if( field.field === 'options' ) datatable_th.setAttribute( 'style', 'width:250px;' )

      datatable_th.innerHTML = field.label;
      datatable_tr.appendChild( datatable_th )
    }
    datatable_thead.appendChild( datatable_tr )
    datatable.appendChild( datatable_thead )
    let datatable_tbody = document.createElement( 'tbody' )
    for( let item of arrayTables ) {
      datatable_tr = document.createElement( 'tr' )
      for( let field of overview_fields ){
        let datatable_td = document.createElement( 'td' )
        if ( field.field === 'options' ){
          datatable_td.setAttribute( 'style', 'text-align:right;' )
          datatable_td.appendChild(
            bsBtnGrp([
              bsBtn( 'Edit', 'btn-sm', 'far fa-edit', () => {
                location.hash = `#tables/update/${item.id}`
              }),
              bsBtn( 'Delete', 'btn-sm', 'fas fa-minus-circle', () => {
                location.hash = `#tables/delete/${item.id}`
              })
            ])
          )
        }else if (field.field === 'wheelchair') {
          switch (item[ field.field ]) {
            default:
            case "1":
            case 1:
              datatable_td.innerText = "Yes";
              break;
            case "0":
            case 0:
              datatable_td.innerText = "No";
              break;
          }
        }else if (field.field === 'status') {
          switch (item[ field.field ]) {
            case "1":
            case 1:
              datatable_td.innerText = "Available";
              break;
            default:
            case "0":
            case 0:
              datatable_td.innerText = "Out of order";
              break;
          }
        }
        else {
          datatable_td.innerText = item[ field.field ]
        }
        datatable_tr.appendChild( datatable_td );
        datatable_tr.setAttribute( 'style', 'height:56px;') // TODO ccolombijn : fix (row height jump at hover) in stylesheet
      }
      datatable_tbody.appendChild( datatable_tr )
    }
    datatable.appendChild( datatable_tbody )
    output.innerHTML = ''
    output.appendChild( datatable )

    $( 'table' ).DataTable()

  }

/* -----------------------------------------------------------------------------
* update
*/
  function updateTable(id){
    navTab({
      id : 'update',
      href : `#tables/update/${id}`,
      icon : 'far fa-edit',
      label : 'Edit Table'

    })
    let output = document.querySelector( '#page_output' );

    $( output ).load( 'templates/update-table.html', () => {
      output.querySelector( '#h2_title_id' ).innerHTML = id;
      let form = output.querySelector( 'form'),
      update_table = form.elements,
      table = getTable( id ),
      table_fields = [ 'id', 'chairs', 'wheelchair', 'status' ]
      for( let field of update_table ){
        if( table_fields.includes( field.id ) ){
          let table = getTable( id )
          field.value = table[ field.id ]
        }
      }
      $( form ).on( 'submit', (event) => {
        event.preventDefault()
        update_table = event.target.elements;

        let set_table = setTable({
          nr : parseInt(update_table.nr.value),
          chairs : update_table.chairs.value,
          wheelchair : update_table.wheelchair.value,
          status : update_table.table_status.value
        })



        navTabRemove( 'update' )
        bsAlert( 'article.page-content', 'primary', '', `Table <b>${table.nr}</b> saved`,()=>{
          location.hash = '#tables/overview'
        })

      })
      $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'update' ) )
    })
  }

  let validateTable = ( form, callback ) => {
    const tables = _glob.arr.tables
    let valid_data = true;
    let table_nr_input = document.getElementById('nr')
    let new_table_nr = ( tables[ tables.length-1 ].nr )+1
    table_nr_input.value = new_table_nr;
    table_nr_input.addEventListener( 'change', (event) => {
      $( event.target ).removeClass( 'is-invalid' )
      const nr_input = event.target.value

      let checkTableNr = ( nr ) => {
        for( let table of tables ){
          if( parseInt( nr ) === parseInt( table.nr ) ){
            return true
          }
        }
      }

      if( checkTableNr( nr_input ) ) {
        $( event.target ).addClass( 'is-invalid' ).after( `<div class="invalid-feedback" id="table-invalid"><i class="fas fa-exclamation-triangle"></i>Table nr ${nr_input} already exists</div>` );
        valid_data = false
        //bsAlert( 'article.page-content', 'warning', '', `Table nr ${nr_input} already exists` )
      }else{
        $( '.invalid-feedback' ).remove();
        valid_data = true
      }
    })



    $( form ).on( 'submit', (event) => {
      event.preventDefault()
      if( valid_data ) callback()
    })
  }

  /* -----------------------------------------------------------------------------
  * delete
  */

  let deleteTable = ( id ) => {
    let table = getTable( id ),
    output = document.getElementById( 'page_output' )
    navTab({
      id : 'delete',
      href : `#tables/delete/${id}`,
      icon : 'fas fa-minus-circle',
      label : 'Delete Reservation'
    })
    $( output ).load( 'templates/delete-table.html', () => {
      let delete_table_id = output.getElementsByClassName('delete_table_id');
      for (let i = 0; i < delete_table_id.length; i++) {
        delete_table_id[i].innerHTML = id;
      }

      $( '#table_id' ).html( id )
      let confirm_button = output.querySelector( 'button' )
      $( confirm_button ).on( 'click', (event) => {
        let tmp_arr = [];
        for( let item of _glob.arr.tables ) if( item.id/1 !== id/1 ) tmp_arr.push( item )
        _glob.arr.tables = tmp_arr;

        navTabRemove( 'delete' )
        bsAlert( 'article.page-content', 'primary', '', `Table <b>${table.nr}</b> deleted`,()=>{
          location.hash = '#tables/overview'
        } )

      })
      $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'delete' ) )
    })

  }


  return {
    main : mainTables,
    add : addTable,
    overview: overviewTables,
    update : updateTable,
    delete : deleteTable
  }
})()



/* -----------------------------------------------------------------------------
* get
*/
function getTable( id ){
  for( let table of _glob.arr.tables ) if( parseInt(table.id) === parseInt(id) ) return table;
}

function getTablesSeats( tables ){
  let seats = 0;
  for( let table of tables ){
    seats += getTable( table ).seats;
  }
}

function getTablesReservationNotOccupied(){
  let tables = [];
  for( let table of _glob.arr.tables ){
    if( !isTableReservationOccupied( table.id ) ){
      tables.push( table )
    }
  }
  return tables
}

function getTableBySeats( persons ){
    let tables = getTablesReservationNotOccupied()
    tables.sort((a, b) => parseFloat(a.chairs) - parseFloat(b.chairs));

    for( let table of tables  ){
      if( persons/1 <= table.chairs/1  ){
        return table.id;
      }
    }
}

/* -----------------------------------------------------------------------------
* set
*/
function setTable( table ){
  for(let i = 0; i < _glob.arr.tables.length; i++){
    if( _glob.arr.tables[i].id === table.id ) _glob.arr.tables[i] = table;
  }
}


/* -----------------------------------------------------------------------------
* is
*/
function isTableReservationOccupied( table ){
  for( let reservation of _glob.arr.reservations ){
    for( let _table of reservation.table ){
      //if( reservation.table.contains( table+'' ) ) return true
      if( table/1 === _table/1 ) return true
    }
  }
}
