var Backbone = require('backbone');
var MenuItem = require('./menu').MenuItem;

var OrderItem = MenuItem.extend({
     idAttribute: '_id',

});

var OrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  getCartTotal: function(){
    var price = this.reduce(function(memo, model){
      return memo + model.get('price');
    }, 0);

    return '$' + (price / 100).toFixed(2);
  }
});

module.exports = {
  'OrderItem' : OrderItem,
  'OrderCollection' : OrderCollection
};
