Catpus.Views.ListEditForm = Backbone.View.extend({
  template: JST['lists/editForm'],
  tagName: 'form',
  className: 'list-edit-form',
  events: {
    'blur #list-edit-title' : 'listEdit',
    'submit' : 'listEdit'
  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this;
  },

  listEdit: function(event){
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    this.model.save(data, {})
    this.remove();
  },
})