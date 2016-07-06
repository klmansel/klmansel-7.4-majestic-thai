var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var handlebars = require('handlebars');
var AppContainer = require('./components/main.jsx').AppContainer;
var NavbarComponent = require('./components/main.jsx').NavbarComponent;
var AboutView = require('./components/main.jsx').AboutView;

ReactDOM.render(
  React.createElement(NavbarComponent),
  document.getElementById('container')
);

ReactDOM.render(
  React.createElement(AppContainer),
  document.getElementById('container2')
);

ReactDOM.render(
  React.createElement(AboutView),
  document.getElementById('container3')
);
