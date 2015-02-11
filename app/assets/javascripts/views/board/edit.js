Catpus.Views.BoardEditForm = Backbone.View.extend({
  template: JST['boards/editForm'],
  tagName: 'form',
  className: 'board-edit-form',
  events: {
    'blur #board-edit-title' : 'listEdit'
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
});