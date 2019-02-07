'use strict'
/*
* assets/js/modules/ingredient.js
* TODO : build module; add functions (overview, view, add, edit & delete) to let things happen
*/

const ingredient = (function(){
  let mainIngredients = function(){
    overviewIngredients();
  }

  let getIngredient = ( id ) => {
    for( let ingredient of _glob.arr.ingredients ) {
      if( parseInt(ingredient.id) === parseInt(id) ) return ingredient
    }
  }
  function setIngredient( ingredient ) {

    for( let i = 0; i < _glob.arr.ingredients.length; i++) {
      if( _glob.arr.ingredients[i].id/1 === ingredient.id/1 ) _glob.arr.ingredients[i] = ingredient
    }
    return ingredient
  }
  let formatIngredient = ( ingredient ) => {
      if(ingredient){ return (ingredient.name + ": " + ingredient.category + ", " + ingredient.price + " per " + ingredient.unit);}
      }/* -----------------------------------------------------------------------------
* overview
*/
let overviewIngredients = () => {
  //if(location.hash !== '#ingredients/overview') location.hash = '#ingredients/overview'
  navActiveItm( 'ingredients/overview' )
  $( 'nav#primary a#ingredients').addClass( 'active' )
  let nav_tab_active = document.querySelector( '.nav-link.active' )
  nav_tab_active.innerHTML = `<i class="fas fa-list"></i> Overview`
  let arrayIngredient = _glob.arr.ingredients;
  let overview_fields  = [
    { label : 'Ingredient', field : 'name' },
    { label : 'Unit', field : 'unit' },
    { label : 'Price per unit', field : 'price' },
    { label : 'Category', field : 'category' },
    { label : 'Allergies', field : 'allergies' },
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
      } else if (field.field === 'price') {
        let price = String(item[ field.field ])
        if( !price.includes('.') ){
          price += ',00'
        }else if( price.split('.')[1].length === 1 ){
          price += '0'

        }
        price = price.replace('.',',')
        table_td.innerHTML = `&euro; ${price}`

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
  let viewIngredient = ( id ) => {

    /*
    let ingredient = getIngredient( id ),
    output = document.getElementById( 'page_output' )
    navTab({
      id : 'view',
      href : `#ingredients/view/${id}`,
      icon : 'far fa-calendar',
      label : 'View Ingredient'
    })
    $( output ).load( 'templates/view-ingredient.html', () => {
      $( '#ingredient' ).html( ingredient )
      let edit_button = output.querySelector( 'a.btn-edit' )
      edit_button.setAttribute( 'href', `#ingredients/edit/${id}` )
      let delete_button = output.querySelector( 'a.btn-delete' )
      delete_button.setAttribute( 'href', `#ingredients/delete/${id}` )
      $( 'a.btn-overview,a.btn-edit,a.btn-delete' ).on( 'click', () => navTabRemove( 'view' ) )

    })
  */}

  function validateIngredient( form, callback ){
    let option_select = ( current_val, select ) => {
      for( let option of option ){
        if( option.innerText === current_val ) option.setAttribute( 'selected', selected )
      }
    }
    let allergies = document.querySelector('select#allergies')
    for( let allergy of _glob.arr.allergies ){
      let allergy_option = document.createElement( 'option' )
      allergy_option.setAttribute( 'value', allergy.id )
      allergy_option.innerText = allergy.label;
      allergies.appendChild( allergy_option )
    }
    let units = document.querySelector('select#unit')
    for( let unit of _glob.arr.units ){
      let unit_option = document.createElement( 'option' )
      unit_option.setAttribute( 'value', unit.id )
      unit_option.innerText = unit.label;
      units.appendChild( unit_option )
    }
    let categories = document.querySelector( 'select#category' )
    for( let category of _glob.arr.categories ){
      let category_option = document.createElement( 'option' )
      category_option.setAttribute( 'value', category.id )
      category_option.innerText = category.label;
      categories.appendChild( category_option )
    }
    let select_option = ( select, val ) => {
      
    }
    let update_id = location.hash.split('/')[2]
    if( update_id ){ //update?
      let ingredient = getIngredient( update_id )

    }

    let button = form.querySelector( 'button' ),
    ingredient = form.elements,
    valid_data = true,
    is_valid = (  input, valid, msg ) => {
      $( `#${input.id}-invalid` ).remove()
      if( valid ) {
        $( input ).removeClass( 'is-invalid' )
      } else {
        $( input ).removeClass( 'is-valid' ).addClass( 'is-invalid' )
        .after( `<div class="invalid-feedback" id="${input.id}-invalid">${msg}</div>` )
      }
    }

    $( form ).on( 'submit', (event) => {
      event.preventDefault()


      if( valid_data ) callback()
    })

  }

  let deleteIngredient = function(id){

      let ingredient = formatIngredient(getIngredient( id )),
      output = document.getElementById( 'page_output' )
      navTab({
        id : 'delete',
        href : `#ingredients/delete/${id}`,
        icon : 'fas fa-minus-circle',
        label : 'Delete Ingredient'
      })
      $( output ).load( 'templates/delete-ingredient.html', () => {
        $( '#ingredient' ).html( ingredient )
        let confirm_button = output.querySelector( 'button' )
        $( confirm_button ).on( 'click', (event) => {
          let tmp_arr = [];
          for( let item of _glob.arr.ingredients ) if( item.id/1 !== id/1 ) tmp_arr.push( item )
          _glob.arr.ingredients = tmp_arr;
          overviewIngredients()
          navTabRemove( 'delete' )
          bsAlert( '#page_output', 'primary', '', `are you sure you want to delete:  ${ingredient} has been deleted` )

        })
        $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'delete' ) )
      })
  }
  /* -----------------------------------------------------------------------------
  * add
  */
  let addIngredient = function(){
    $( 'nav#primary a#ingredients').addClass( 'active' )
    let output = document.querySelector( '#page_output' )
    $( output ).load( 'templates/add-ingredient.html', () => {
      navActiveItm( 'ingredients/add' )
      let add_form = output.querySelector( 'form' )

      validateIngredient( add_form, () => {
        let add_ingredient = add_form.elements;
        let add_ingredient_id = getRandomInt(10000,99999),
        add_ingredient_data = {
          id : add_ingredient_id,
          name : add_ingredient.name.value,
          unit : add_ingredient.unit.value,
          category : add_ingredient.category.value,
          price : add_ingredient.price.value,
          allergies : add_ingredient.allergies.value
        }
        _glob.arr.ingredients.unshift( add_ingredient_data )
          bsAlert( 'article.page-content','primary','',`Ingredient ${add_ingredient_data.name} has been saved`,() => {
            location.hash = '#ingredients'
        })

      })
    })
  }
  /* -----------------------------------------------------------------------------
  * delete
  */
  let updateIngredient = ( id ) => {
    $( 'nav#primary a#ingredients').addClass( 'active' )
    navTab({
      id : 'update',
      href : `#ingredients/update/${id}`,
      icon : 'far fa-edit',
      label : 'Edit Ingredient'

    })
    let output = document.querySelector( '#page_output' )
    $( output ).load( 'templates/update-ingredient.html', () => {
      let form = output.querySelector( 'form'),
      edit_ingredient = form.elements,
      ingredient = getIngredient( id )
      let ingred = getIngredient(id);

      document.getElementById("name").value = ingred.name;
      document.getElementById("price").value = ingred.price;
      //document.getElementById("unit").value = ingred.unit;
      //document.getElementById("category").value = ingred.category;
      //document.getElementById("allergies").value = ingred.allergies;
      //$( form ).on( 'submit', (event) => {
      validateIngredient( form, () => {
        event.preventDefault()
        edit_ingredient = event.target.elements;

        let set_ingredient = setIngredient({
          id : id,
          name : edit_ingredient.name.value,
          unit : edit_ingredient.unit.value,
          category : edit_ingredient.category.value,
          price : edit_ingredient.price.value,
          allergies : edit_ingredient.allergies.value
        })

        navTabRemove( 'edit' )
        bsAlert( '.page-content', 'primary', '', ` ingredient: ${formatIngredient(set_ingredient)} has been edited`,()=>{
          location.hash = '#ingredients/overview'
        })

      })

      $( '.overview-link' ).on( 'click', (event) => navTabRemove( 'update' ) )

    })

  }

  return{
    main : mainIngredients,
    overview : overviewIngredients,
    delete : deleteIngredient,
    view : viewIngredient,
    add : addIngredient,
    update : updateIngredient
  }
})()
