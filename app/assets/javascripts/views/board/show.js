Catpus.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board-show',

  initialize: function(){
    this.collection = this.model.lists();
    this.members = this.model.members();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    this.collection.each(function(list){
      this.addList(list);
    }.bind(this));
    this.renderForm();
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
        console.log('what')
      this.collection.fetch();
    }.bind(this));
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.ListForm({board: this.model});
    this.addSubview('.list-form', form)
  },

  addList: function(list){
    var view = new Catpus.Views.List({model: list})
    this.addSubview('.list-index', view)
  },

  addMember: function(member){
    var view = new Catpus.Views.Member({model: member})
  },
  
})