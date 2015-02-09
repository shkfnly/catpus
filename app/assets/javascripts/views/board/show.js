Catpus.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board-show',

  initialize: function(){
    this.collection = this.model.lists();
    this.members = this.model.members();
    this.repository = this.model.repository();
    this.issues = this.repository.issues();
    this.vents = this.repository.events();
    this.repository.fetch({ 
      data: {id: this.model.id}
     }
    );
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'change sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.vents, 'add', this.addEvent);
    this.listenTo(this.issues, 'add', this.addIssue);
    // this.listenTo(this.contributers, 'add', this.addContributer);
    // this.listenTo(this.collaborators, 'add', this.addCollaborator);
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
    this.renderEvents();
    // this.renderIssues();
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

  addEvent: function(vent){
    var view = new Catpus.Views.Event({model: vent})
    this.addSubview('.event-index', view);
  },

  renderEvents: function(){
    this.vents.each(this.addEvent.bind(this));
  },

  addIssue: function(issue){
    var view = new Catpus.Views.Issue({model: issue});
    this.addSubview('.issue-index', view);
  },

  renderIssues: function(){
    this.issues.each(this.addIssue.bind(this));
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
      this.collection.fetch({data: {board_id: this.model.id}});
    }.bind(this));
  }
  
})