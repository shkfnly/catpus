Catpus.Views.List = Backbone.CompositeView.extend({

  template: JST['lists/list'],
  className: 'list-display',

  initialize: function(){
    this.collection = this.model.cards();
    this.listenTo(this.model, 'change sync', this.render);
    this.listenTo(this.collection, 'change sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.renderForm();
    this.collection.each(function(card){
      this.addCard(card);
    }.bind(this));
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){

      this.collection.fetch({
        sucess: function(){
          _(this.subviews('.card-index')).each(function(subview){
            this.removeSubview('.card-index', subview);
          }.bind(this))
          this.collection.each(function(card){
            this.addCard(card);
          }.bind(this))
        }.bind(this),
        data: {list_id: this.model.id},

      });
    }.bind(this));
  },

  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.CardForm({list: this.model, collection: this.collection});
    this.addSubview('.card-form', form);
  },

  addCard: function(card){
    
    var view = new Catpus.Views.Card({model: card});
    this.addSubview('.card-index', view);
  }

})