Catpus.Views.Board = Backbone.View.extend({
  template: JST['boards/item'],
  className: 'board-item col-md-3 well well-material-blue-grey-500',

  events: {
    'click' : 'handleClick',
  },

  initialize: function(){
    this.listenTo(this.model, 'change sync', this.render);
  },

  render: function(){
    var content = this.template({board: this.model})
    this.$el.html(content);
    return this;
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
    Backbone.history.navigate('boards/' + this.model.id, {trigger: true})
  }
});