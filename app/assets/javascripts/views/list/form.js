Catpus.Views.ListForm = Backbone.View.extend({
  template: JST['lists/form'],
  tagName: 'form',
  className: 'list-form',
  events: {
    'submit' : 'listCreate'
  },

  initialize: function(options){
    this.board = options.board;
    this.collection = this.board.lists();
    this.model = new Catpus.Models.List();
  },

  render: function(){
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this;
  },

  listCreate: function(event){
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      success: function(){
        this.collection.add(this.model);
      }.bind(this)
    })
    this.$('#list-title').val('');
  },
})