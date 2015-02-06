Catpus.Views.Dashboard = Backbone.CompositeView.extend({
  // orderOptions: {
  //   modelElement: '.card-display',
  //   modelName: 'card',
  //   subviewContainer: '.list-cards'
  // },

  template: JST['boards/index'],
  className: 'board-display',

  initialize: function(){
    this.collection = this.model.boards();
    this.listenTo(this.model, 'sync', this.render);
    // I am curious about these two listenTos below
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    this.collection.each(function(board){
      this.addBoard(board)
    }.bind(this));
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.collection.fetch();
    }.bind(this));
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addBoard: function(board){
    var view = new Catpus.Views.Board({model: board});
    this.addSubview('.board-index', view);
  }
})

