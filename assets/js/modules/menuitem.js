'use strict';
/*
* assets/js/modules/Menuitem.js
* TODO : build module; add functions (overview, add, update & delete) to let things happen
*/



const menuitem = (function() {
  let mainMenuItems = function(){
    console.log("mainMenuItems says hi")
    overviewMenuItems();
  }
  /* -----------------------------------------------------------------------------
  * overview
  */
  function overviewMenuItems(){
    console.log("overviewMenuItems says hi")
    $( 'nav#primary a#menuitems').addClass( 'active' )
    let nav_tab_active = document.querySelector( '.nav-link.active' )
    nav_tab_active.innerHTML = `<i class="fas fa-list"></i> Overview`
    let arrayMenuitems = _glob.arr.menu;
    let overview_fields = [
      { label : 'Item Name', field : 'name' },
      { label : 'Category', field : 'category' },
      { label : 'Price', field : 'price' },
      { label : 'Percentage', field : 'percentage' },
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
    for( let item of arrayMenuitems ) {
      datatable_tr = document.createElement( 'tr' )
      for( let field of overview_fields ){
        let datatable_td = document.createElement( 'td' )
        if ( field.field === 'options' ){
          datatable_td.setAttribute( 'style', 'text-align:right;' )
          datatable_td.appendChild(
            bsBtnGrp([
              bsBtn( 'Edit', 'btn-sm', 'far fa-edit', () => {
                location.hash = `#menuitems/update/${item.id}`
              }),
              bsBtn( 'Delete', 'btn-sm', 'fas fa-minus-circle', () => {
                location.hash = `#menuitems/delete/${item.id}`
              })
            ])
          )
        } else if (field.field === 'category') {
          let menu_category = _glob.arr.menu_categories.filter(obj => {
            return obj.id === item[ field.field ]
          })
          datatable_td.innerText = menu_category[0].label;
        } else if (field.field === 'price') {
          //format price as currency
          datatable_td.innerText = `\u20AC ${item[ field.field ].toFixed(2).toString().replace(".", ",")}`
        } else if (field.field === 'percentage') {
          //format price as currency
          datatable_td.innerText = `${item[ field.field ]}%`
        }else {
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

    $( 'menuitem' ).DataTable()



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
  * update
  */
  function updateMenuItem(){
    console.log("viewMenuItem says hi");
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
    update : updateMenuItem,
    delete : deleteMenuItem
  }

})()
