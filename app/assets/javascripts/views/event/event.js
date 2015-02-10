Catpus.Views.Event = Backbone.View.extend({
  template: JST['events/event'],
  tagName: 'li',

  initialize: function(){
    this.listenTo(this.model, 'change sync add', this.render);
    // this.initializePusher();
  },
  
  render: function(){
    var content = this.template({vent: this.model});
    this.$el.html(content);
    return this;
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
    }.bind(this));
  }

})