Catpus.Views.Board = Backbone.View.extend({
  template: JST['boards/item'],

  events: {
    'click' : 'handleClick'
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
})