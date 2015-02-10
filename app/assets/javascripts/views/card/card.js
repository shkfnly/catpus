Catpus.Views.Card = Backbone.CompositeView.extend({
  template: JST['cards/card'],
  className: 'card',

  initialize: function(){
    this.collection = this.model.tasks();
    this.listenTo(this.model, 'sync change destroy', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    // this.channel = pusher.subscribe('boards');
    // this.channel.bind('webhook-push', function(data){
    //   this.model.fetch();
    // }.bind(this));
    // this.collection.each(function(task){
    //   this.addTask(task)
    // }.bind(this));
  },

  events: {
    'click .delete-card' : 'deleteCard',
    'click .edit-card' : 'renderEditCard',
    'click' : 'renderModal'
  },

  render: function(){
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addTask: function(task){
    var view = new Catpus.Views.Task({model: task});
    this.addSubview('.task-index', view);
  },

  deleteCard: function(){
    this.model.destroy({wait: true})
    this.remove();
  },

  renderEditCard: function(event){
    event.preventDefault();
    var view = new Catpus.Views.CardEditForm({model: this.model})
    $(event.target.parentElement).html(view.render().$el)
  },

  renderModal: function(){}



})