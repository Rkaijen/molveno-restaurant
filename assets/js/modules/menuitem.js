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
