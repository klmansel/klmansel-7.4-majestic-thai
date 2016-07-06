var React = require('react');
var MenuCollection = require('../models/menu').MenuCollection;
var OrderCollection = require('../models/order').OrderCollection;

var NavbarComponent = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <nav>
            <ul className="navlist col-md-8 col-md-offset-2">
              <a href="#menu"><li>Order Online</li></a>
              <a href="#locations"><li>Locations</li></a>
              <a href="#contact-us"><li>Contact Us</li></a>
            </ul>
          </nav>
          <header>
            Majestic Thai
          </header>
        </div>
      </div>
      );
    }
  });

  var AboutView = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="locations">
          <a className="anchors" name="locations"><h4>Locations</h4></a>
          <ul>
            <li>Main Street</li>
            <li>Green Street</li>
            <li>River Avenue</li>
          </ul>
        </div>
        <div className="contact-us">
        <a className="anchors" name="contact-us"><h4>Contact Us</h4></a>
          <p>Majestic Thai
            420 Main Street
          Anywhere, US 12345
          majestic@karasmail.com
            (800)-555-4321
          </p>
           <a href="https://www.twitter.com" className="btn btn-social-icon btn-twitter">
             <span className="fa fa-twitter"></span></a>
             <a href="https://www.facebook.com" className="btn btn-social-icon btn-facebook">
               <span className="fa fa-facebook"></span></a>
              <a href="https://www.yelp.com"> <img className="yelp-button" src="images/yelpbutton.png" alt="Yelp"/></a>

         </div>
         <div><a className="anchors" href="index.html">Back to Top</a></div>
      </div>
    )
  }
});

var Menu = React.createClass({
  render: function(){
    var self= this;
    var appetizers= this.props.menuItems.where({
      foodType: 'Appetizer'
    }).map(function(model){
      return (
      <li key={model.cid}>{model.get('title')} {model.displayPrice()} <button onClick={function(){self.props.addToCart(model)}} className="btn btn-xs add-button">Add</button></li>
      );
  });
    var entrees=this.props.menuItems.where({
      foodType: 'Entree'
    }).map(function(model){
      return (
      <li key={model.cid}>{model.get('title')} {model.displayPrice()} <button onClick={function(){self.props.addToCart(model)}} className="btn btn-xs add-button">Add</button></li>
      );
    });
    var desserts=this.props.menuItems.where({
      foodType: 'Desserts'
    }).map(function(model){
      return (
      <li key={model.cid}>{model.get('title')} {model.displayPrice()} <button onClick={function(){self.props.addToCart(model)}} className="btn btn-xs add-button">Add</button></li>
      );
    });
    return (
    <div className="row">
        <section className="menu col-md-7">
          <a className="anchors" name="menu"><h2>Full Menu</h2></a>
          <h4>Appetizers</h4>
            <ul>
            {appetizers}
            </ul>
          <h4>Entrees</h4>
            <ul>
            {entrees}
            </ul>
          <h4>Desserts</h4>
            <ul>
            {desserts}
            </ul>
        </section>

      </div>
    );
  }
});

var Order = React.createClass({
  render: function(){
        var self = this;
        var collection = this.props.orderItems;
        var orderItemList = collection.map(function(model){
          console.log(model.displayPrice());

          return (
            <div key={model.cid}>
              <li >{model.get('title')} {model.displayPrice()}
                <button onClick={function(){self.props.removeFromCart(model)}}>Remove From Cart</button>
              </li>
            </div>
          );
        });

        return (
          <div>
            <ul>
              {orderItemList}
            </ul>
            Cart Total: {collection.getCartTotal()}
          </div>
          );
  }
});

var AppContainer = React.createClass({
  getInitialState: function(){
    return {
      menuItems : [],
      orderItems : []
    }
  },
  componentWillMount: function(){
    var menuItems = new MenuCollection();
    var orderItems = new OrderCollection();

    menuItems.add([
      {foodType: 'Appetizer' ,title:'Fried Tofu',price: 195},
      {foodType: 'Appetizer' ,title:'Fried Eggplant',price: 250},
      {foodType: 'Appetizer' ,title:'Spring Roll',price: 275},
      {foodType: 'Entree' ,title:'Shrimp Pad Thai',price: 1095},
      {foodType: 'Entree' ,title:'Green Curry',price: 995},
      {foodType: 'Entree' ,title:'Pad See',price: 1195},
      {foodType: 'Entree' ,title:'Pad Kee Mao',price: 895},
      {foodType: 'Entree' ,title:'Spicy Fried Rice',price: 750},
      {foodType: 'Desserts' ,title:'Thai Sticks',price: 325},
      {foodType: 'Desserts' ,title:'Banana Coins',price: 395},
      {foodType: 'Desserts' ,title:'Fried Ice Cream',price: 425}
    ]);

    this.setState({
      'menuItems': menuItems,
      'orderItems': orderItems
    });
  },
  addToCart: function(model){
    console.warn(model);
    this.state.orderItems.add(model);
    this.forceUpdate();
  },
  removeFromCart: function(model){
    this.state.orderItems.remove(model);
    this.forceUpdate();
  },
  render: function(){
    return (
      <div>
        <div className='col-md-8'>
          <Menu addToCart={this.addToCart} menuItems={this.state.menuItems}/>
        </div>

        <div className='col-md-4 cart-section'>

          <Order removeFromCart={this.removeFromCart} orderItems={this.state.orderItems}/>
        </div>
        <button  className="btn btn-success checkout-button" name="checkout">Checkout</button>
      </div>
    );
  }
});

module.exports = {
  'NavbarComponent' : NavbarComponent,
  'AppContainer' : AppContainer,
  'AboutView' : AboutView
};
