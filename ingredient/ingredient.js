 'use strict'

class Ingredient{
  constructor( id, name, price, inStock, unit, allergies, type){
    if( typeof id === 'object'){ // arguments als object
      let data = id;
      this.id = data.id;
      this.name = data.name;
      this.price = data.price;
      this.inStock = data.inStock;
      this.unit = data.unit;
      this.allergies = data.allergies;
      this.type = data.type;
    } else {
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.unit = unit;
      this.allergies = allergies;
      this.type = type;
    }
  }
  used(amount){
    this.inStock -= amount;
  }
  addStock(amount){
    this.inStock += amount;
  }

  getPropertyLabels(){
    return {
      id : 'Id',
      name : 'Name',
      price : 'Price',
      inStock : 'In Stock',
      unit : 'Unit',
      allergies : 'Allergy Information',
      type : 'Type'
    }
  }
}
 let data =  {
   id : 2345,
   name : 'test',
   price : 2.23,
   inStock : 0,
   unit : 'test',
   allergies : [],
   type : 3
 }
 let obj = new Ingredient(data)
 console.log( obj.price )
 obj = new Ingredient( 2345, 'test', 2.23, 0, 'test', [], 3 )
 console.log( obj )
