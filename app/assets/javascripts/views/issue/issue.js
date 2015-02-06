Catpus.Views.Issue = Backbone.View.extend({
  template: JST['issues/item'],

  initialize: function(){
    this.listenTo(this.model, 'change sync add', this.render);
  },

  render: function(){
    var content = this.template({issue: this.model});
    this.$el.html(content);
    return this;
  }
})