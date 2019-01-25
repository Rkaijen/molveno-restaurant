class MenuItem {

  constructor (id, name, ingredients, category, price, percentage, recipe, picture, description ) {
    if( typeof id === 'object'){ // arguments als object
      let data = id;
      this._id = data.id;
      this._name = data.name;
      this._ingredients = data.ingredients;
      this._category = data.category;
      this._price = data.price;
      this._percentage = data.percentage;
      this._recipe = data.recipe;
      this._pictue = data.picture;
      this._description = data.description;
    }else{
      this._id = id;
      this._name = name;
      this._ingredients = ingredients;
      this._category = category;
      this._price = price;
      this._percentage = percentage;
      this._recipe = recipe;
      this._pictue = picture;
      this._description = description;
    }
  }
}
