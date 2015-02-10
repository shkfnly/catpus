Catpus.Views.Event = Backbone.View.extend({
  template: JST['events/event'],
  tagName: 'li',

  initialize: function(){
    this.listenTo(this.model, 'change sync add', this.render);
  },
  
  render: function(){
    var content = this.template({vent: this.model});
    this.$el.html(content);
    return this;
  }

})
;
