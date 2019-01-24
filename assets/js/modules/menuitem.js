'use strict'
/*
* assets/js/modules/MenuItemitem.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/



const menuitem = (function() {
  function mainMenuItems(){
    overviewMenuItems();
  }
  /* -----------------------------------------------------------------------------
  * overview
  */
  function overviewMenuItems(){
    navActiveItm( 'menuitems/overview' )
    $( 'nav#primary a#menuitems').addClass( 'active' )
    let nav_tab_active = document.querySelector( '.nav-link.active' )
    let arrayMenuItems = _glob.arr.menuitems;
    let overview_fields = [
      { label : '<i class="far fa-calendar"></i> Reservation', field : 'reservation' },
      { label : '<i class="fas fa-user"></i> Guest', field : 'guest' },
      { label : 'Persons', field : 'persons' },
      { label : 'Table', field : 'table' },
      { label : '', field : 'options' },
    ]
    let output = document.querySelector( '#page_output' ),
    overview = document.createElement( 'table' )
    overview[ 'id' ] = 'menuitems_overview'
    output.appendChild( overview )

  }
  /* -----------------------------------------------------------------------------
  * view
  */
  function viewMenuItem(){
    console.log("viewMenuItem says hi");
  }
  /* -----------------------------------------------------------------------------
  * add
  */
  function addMenuItem(){
    console.log("addMenuItem says hi");
  }
  /* -----------------------------------------------------------------------------
  * delete
  */
  function deleteMenuItem(){
    console.log("deleteMenuItem says hi");
  }

  return {
    main : mainMenuItems,
    overview : overviewMenuItems,
    view : viewMenuItem,
    add : addMenuItem,
    delete : deleteMenuItem
  }

})()
