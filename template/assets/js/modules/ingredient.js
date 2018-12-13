'use strict'
/*
* assets/js/modules/ingredient.js
* TODO : build module; add functions (overview, view, add, update & delete) to let things happen
*/

const ingredient = function(){
  let mainIngredients = function(){

  }

/* -----------------------------------------------------------------------------
* overview
*/
  let overviewIngredients = function(){
    console.log("overviewIngredients says hi");
  }
  /* -----------------------------------------------------------------------------
  * view
  */
  let viewIngredient = function(id){
    console.log("viewIngredient says hi");
  }
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
}
