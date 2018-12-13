'use strict'
/*
* assets/js/modules/ingredient.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/

const ingredient = (function(){
  let mainIngredients = function(){
    overviewIngredients();
  }

/* -----------------------------------------------------------------------------
* overview
*/
let overviewIngredients = () => {
  //if(location.hash !== '#ingredients/overview') location.hash = '#ingredients/overview'
  navActiveItm( 'ingredients/overview' )
  $( 'nav#primary a#ingredients').addClass( 'active' )
  let nav_tab_active = document.querySelector( '.nav-link.active' )
  nav_tab_active.innerHTML = `<i class="fas fa-list"></i> Overview`
  let arrayIngredient = _glob.arr.ingredients;
  let overview_fields = [
    { label : '<i class="far fa-calendar"></i> Ingredient', field : 'ingredient' },
    { label : '<i class="fas fa-user"></i> Unit', field : 'unit' },
    { label : 'Price', field : 'price' },
    { label : 'Type', field : 'type' },
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

    if( field.field === 'options' || field.field === 'ingredient'  ) table_th.setAttribute( 'style', 'width:250px;' )

    table_th.innerHTML = field.label;
    table_tr.appendChild( table_th )
  }
  table_thead.appendChild( table_tr )
  table.appendChild( table_thead )
  let table_tbody = document.createElement( 'tbody' )
  for( let item of arrayIngredient ) {
    table_tr = document.createElement( 'tr' )
    for( let field of overview_fields ){
      let table_td = document.createElement( 'td' )
      if ( field.field === 'options' ){
        table_td.setAttribute( 'style', 'text-align:right;' )
        table_td.appendChild(
          bsBtnGrp([
            bsBtn( 'Edit', 'btn-sm', 'far fa-edit', () => {
              location.hash = `#ingredients/update/${item.id}`
            }),
            bsBtn( 'Delete', 'btn-sm', 'fas fa-minus-circle', () => {
              location.hash = `#ingredients/delete/${item.id}`
            })
          ])
        )
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
  if( arrayIngredient.length < 11 ) $('ul.pagination').hide()

}

  /* -----------------------------------------------------------------------------
  * view
  */
  let viewIngredient = ( id ) => {/*
    let ingredient = formatIngredient( getIngredient( id ) ),
    unit = getUnitName( getIngredient( id ).unit ),
    output = document.getElementById( 'page_output' )
    navTab({
      id : 'view',
      href : `#ingredients/view/${id}`,
      icon : 'far fa-calendar',
      label : 'View Ingredient'
    })
    $( output ).load( 'templates/view-ingredient.html', () => {
      $( '#unit' ).html( unit )
      $( '#ingredient' ).html( ingredient )
      let edit_button = output.querySelector( 'a.btn-edit' )
      edit_button.setAttribute( 'href', `#ingredients/update/${id}` )
      let delete_button = output.querySelector( 'a.btn-delete' )
      delete_button.setAttribute( 'href', `#ingredients/delete/${id}` )
      $( 'a.btn-overview,a.btn-edit,a.btn-delete' ).on( 'click', () => navTabRemove( 'view' ) )

    })
  */}
  /* -----------------------------------------------------------------------------
  * add
  */
  let addIngredient = function(){
    console.log("addIngredient says hi");
  }
  /* -----------------------------------------------------------------------------
  * delete
  */
  let deleteIngredient = function(id){
    console.log("deleteIngredient says hi");
  }
  return{
    main : mainIngredients,
    overview : overviewIngredients,
    view : viewIngredient,
    add : addIngredient,
    delete : deleteIngredient
  }
})()
