'use strict'
/*
* assets/js/modules/table.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/
function mainTables(){
  overviewTables();
}
/* -----------------------------------------------------------------------------
* overview
*/
function overviewTables(){

}
/* -----------------------------------------------------------------------------
* view
*/
function viewTable(){

}
/* -----------------------------------------------------------------------------
* add
*/
function addTable(){

}
/* -----------------------------------------------------------------------------
* delete
*/
function deleteTable(){

}
/* -----------------------------------------------------------------------------
* get
*/
function getTable( id ){
  for( let table of _glob.arr.tables ) if( table.id === id/1 ) return table;
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
    console.log( tables )
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
    if( _glob.arr.tables[i].id === reservation.id ) _glob.arr.tables[i] = table;
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
