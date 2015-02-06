Catpus.Views.Board = Backbone.View.extend({
  template: JST['boards/item'],

  events: {
    'click' : 'handleClick'
  },

  initialize: function(){
    this.listenTo(this.model, 'change sync add', this.render);
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
    }.bind(this));
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