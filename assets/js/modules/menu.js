'use strict'
/*
* assets/js/modules/menu.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/
const menu = (function() {
  function mainMenu(){
    overviewMenu();
  }
  /* -----------------------------------------------------------------------------
  * overview
  */
  function overviewMenu(){
    console.log("overviewMenu says hi");
    //navActiveItm( 'menu/overview' )
    $( 'nav#primary a#menu').addClass( 'active' )
    let nav_tab_active = document.querySelector( '.nav-link.active' )
    let arrayMenuItems = _glob.arr.menu;
    let overview_fields = [

    ]
    let output = document.querySelector( '#page_output' ),
    overview = document.createElement( 'table' )
    overview[ 'id' ] = 'menu_overview'
    output.appendChild( overview )
  }
  /* -----------------------------------------------------------------------------
  * view
  */
  function viewMenu( id ){
    console.log("viewMenu says hi");
  }
  /* -----------------------------------------------------------------------------
  * add
  */
  function addMenu(){
    $( 'nav#primary a#menu').addClass( 'active' )
    console.log("addMenu says hi");
  }
  /* -----------------------------------------------------------------------------
  * update
  */
  function updateMenu( id ){
    console.log("updateMenu says hi");
  }
  /* -----------------------------------------------------------------------------
  * delete
  */
  function deleteMenu( id ){
    console.log("deleteMenu says hi");
  }
  return {
    main : mainMenu,
    overview : overviewMenu,
    view : viewMenu,
    add : addMenu,
    delete : deleteMenu
  }

})()
