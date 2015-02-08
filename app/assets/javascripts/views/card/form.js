Catpus.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],
  tagName: 'form',
  className: 'cardform',

  events: {
    'submit' : 'cardCreate'
  },

  initialize: function(options){
    this.list = options.list;
    this.model = new Catpus.Models.Card();
  },

  render: function(){
    var content = this.template({model: this.model, list: this.list});
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },

  cardCreate: function(event){
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      success: function(){
        this.collection.add(this.model);
      }.bind(this)
    })
    this.$('#card-title').val('');
    this.$('textarea').val('');

  },
})