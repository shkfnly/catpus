Catpus.Views.List = Backbone.CompositeView.extend({
  orderOptions: {
    modelElement: '.card-display',
    modelName: 'card',
    subviewContainer: '.card-index'
  },

  template: JST['lists/list'],
  className: 'list-display well well-material-blue-grey-200',

  events: {
    'click .delete-list' : 'deleteList',
    'click .edit-list' : 'renderEditList',
    'sortreceive' : 'receiveCard',
    'sortremove' : 'removeCard',
    'sortstop' : 'saveCards',
    'click .list-title' : 'editDelete'
  },

  initialize: function(){
    this.collection = this.model.cards();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.initializePusher();
  },

  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.$el.data('list-id', this.model.id)
    this.renderForm();
    this.renderCards();
    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.CardForm({list: this.model, collection: this.collection});
    this.addSubview('.card-form', form);
  },

  addCard: function(card){
    
    var view = new Catpus.Views.Card({model: card});
    this.addSubview('.card-index', view);
  },

  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardTitle = $cardDisplay.data('card-title'),
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new Catpus.Models.Card({
      title: cardTitle,
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();
    this.collection.add(cardClone, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('.list-cards');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
  },

  saveCards: function(event) {
    event.stopPropagation();
    this.saveOrds();
  },

  renderCards: function(){
    this.model.cards().each(this.addCard.bind(this));
    this.$('.card-index').sortable({connectWith: '.card-index'});
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.collection.fetch({ data: {list_id: this.model.id}
      });
    }.bind(this));
  },

  deleteList: function(){
    this.model.destroy({wait: true})
    this.remove();
  },

  renderEditList: function(event){
    event.preventDefault();
    var view = new Catpus.Views.ListEditForm({model: this.model})
    $(event.target.parentElement).html(view.render().$el)
  },

  editDelete: function(event){
    if ($(event.target).data('clicked') === true){
      $(event.target).html(this.model.escape('title'));
      $(event.target).data('clicked', false );
    } else{
      $(event.target).append("<span class='edit-list glyphicon glyphicon-pencil'></span><span class='delete-list glyphicon glyphicon-remove-sign'></span>")
      $(event.target).data('clicked', true)
    }
  }
});

_.extend(Catpus.Views.List.prototype, Catpus.Utils.OrdView);