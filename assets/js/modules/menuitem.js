'use strict'
/*
* assets/js/modules/MenuItemitem.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/
const menuitem = (function(){




  let validateTable = ( form, callback ) => {
    let valid_data = true;

    $( form ).on( 'submit', (event) => {
      event.preventDefault()
      if( valid_data ) callback()
    })
  }


  function mainMenuItems(){
    overviewMenuItems();
  }
  /* -----------------------------------------------------------------------------
  * overview
  */
  function overviewMenuItems(){
    console.log("overviewMenuItems says hi");
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
    // console.log("addMenuItem says hi");

    // let output = document.querySelector( '#page_output' )
    // $( 'nav#primary a#tables').addClass( 'active' )
    // $( output ).load( 'templates/add-table.html', () => {
    //   let add_form = output.querySelector( 'form' )
    //   validateTable( add_form, () => {
    //     let add_table = add_form.elements;
    //     let add_table_data = {
    //       id : parseInt(add_table.table_id.value),
    //       chairs : add_table.chairs.value,
    //       wheelchair : add_table.wheelchair.value,
    //       status : add_table.table_status.value
    //     }
    //     _glob.arr.tables.unshift( add_table_data )
    //     console.log( _glob.arr.tables )
    //     bsAlert( '.page-content','primary','',`Table for <b>${add_table.table_id.value}</b> has been saved` )
    //     location.hash = '#tables'
    //   })
    // })

  }
  /* -----------------------------------------------------------------------------
  * delete
  */
  function deleteMenuItem(){
    console.log("deleteMenuItem says hi");
  }


  return {
    add : addMenuItem,
    overview: overviewMenuItems,
    main : mainMenuItems,
  }
})()
