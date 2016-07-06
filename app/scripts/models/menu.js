var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  displayPrice: function(){
      return '$' + (this.get('price') / 100).toFixed(2);
    }
});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem
});

module.exports = {
  'MenuItem' : MenuItem,
  'MenuCollection' : MenuCollection
};
