Catpus.Views.Contributer = Backbone.View.extend({
  template: JST['users/contribs'],
  className: 'contrib-icon',

  render: function(){
    var content = this.template({contrib: this.model});
    this.$el.html(content);
    return this;
  }
})