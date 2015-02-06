Catpus.Views.IssueIndex = Backbone.CompositeView.extend({

  template: JST['issues/index'],
  className: 'issue-display',

  initialize: function(){
    this.collection = this.model.issues();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    this.collection.each(function(issue){
      this.addIssue(issue)
    }.bind(this))
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addIssue: function(issue){
    var view = new Catpus.Views.Issue({model: issue});
    this.addSubview('.issue-index', view);
  }
})