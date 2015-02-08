Catpus.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board-show',

  initialize: function(){
    this.collection = this.model.lists();
    this.members = this.model.members();
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'change sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    // this.collection.each(function(list){
    //   this.addList(list);
    // }.bind(this));
    this.initializePusher();
    
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    
    this.renderLists();
    this.renderForm();
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

  renderLists: function(){
    this.model.lists().each(this.addList.bind(this));
    this.$('.list-index').sortable();
  },

  addMember: function(member){
    var view = new Catpus.Views.Member({model: member})
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
      this.collection.fetch();
    }.bind(this));
  }
  
})