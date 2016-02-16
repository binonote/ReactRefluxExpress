var React = require('react');
var ListItem = require('./ListItem.jsx');
var IngredientStore = require('../reflux/ingredients-store.jsx');
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx')
var List = React.createClass({
    mixins:[Reflux.listenTo(IngredientStore, 'onChangeData')],
    getInitialState: function() {
        return {ingredients:[],
                newText: ""
                };
    },
    //Either this set listen in componentDidMount or use mixins  with listenTo like above
    // componentDidMount: function() {
    //   IngredientStore.listen(this.onChangeData);
    // },
    componentWillMount: function() {
      Actions.getIngredients();
    },
    onChangeData: function(ingredients) {
      this.setState({
        ingredients: ingredients
      })
    },
    onClick: function(e) {
      if(this.state.newText) {
        Actions.postIngredient(this.state.newText);
      }
      this.setState({newText: ""});
    },
    onInputChange: function(e) {
      this.setState({newText: e.target.value});
    },
    render: function() {
        var listItems = this.state.ingredients.map(function(item) {
            return <ListItem key={item.id} ingredient={item.text} />;
        });

        return (
          <div>
            <input
              placeholder="Add Item"
              value={this.state.value}
              onChange={this.onInputChange} />
            <button onClick={this.onClick}>Add Item</button>
            <ul>{listItems}</ul>
          </div>
        );
    }
});

module.exports = List;
