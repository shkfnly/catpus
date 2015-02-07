Catpus.Views.List = Backbone.CompositeView.extend({

  template: JST['lists/list'],
  className: 'list-display',

  initialize: function(){
    this.collection = this.model.cards();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.collection.each(function(card){
      this.addCard(card);
    }.bind(this));
    this.renderForm();
  },

  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.CardForm({list: this.model});
    this.addSubview('.card-form', form);
  },

  addCard: function(card){
    var view = new Catpus.Views.Card({model: card});
    this.addSubview('.card-index', view);
  }

})