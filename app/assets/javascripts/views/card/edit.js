Catpus.Views.CardEditForm = Backbone.View.extend({
  template: JST['cards/editForm'],
  tagName: 'form',
  className: 'card-edit-form',
  events: {
    'blur #card-edit-title' : 'cardEdit'
  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this;
  },

  cardEdit: function(event){
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    this.model.save(data, {})
    this.remove();
  },
})