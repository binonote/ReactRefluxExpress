var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
  listenables: [Actions],

  //Either use init function and set listenTo like below or use listenables like above
  // init: function() {
  //   this.listenTo(Actions.getIngredients, this.getIngredients);
  //   this.listenTo(Actions.postIngredient, this.postIngredient);
  // },
  getIngredients: function() {
    HTTP.get('/ingredients')
    .then(function(json) {
      this.ingredients = json;
      this.fireUpdate();
    }.bind(this));
  },
  postIngredient: function(text) {
    if(!this.ingredients) {
      this.ingredients = [];
    }
    var ingredient = {
      "text": text,
      "id": Math.floor(Date.now() / 1000) + text
    };

    this.ingredients.push(ingredient);
    this.fireUpdate();

    HTTP.post('/ingredients', ingredient)
    .then(function(response){
      this.getIngredients();
    }.bind(this));

  },
  fireUpdate: function() {
    this.trigger(this.ingredients);
  }

});

module.exports = IngredientStore;
