Catpus.Views.Issue = Backbone.View.extend({
  template: JST['issues/item'],
  tagName: 'li',
  events: {
    'click .close-issue' : 'closeIssue'
  },

  initialize: function(){
    this.listenTo(this.model, 'change sync add', this.render);
  },

  render: function(){
    var content = this.template({issue: this.model});
    this.$el.html(content);
    return this;
  },

  closeIssue: function(event) {
    event.preventDefault();
    $.ajax({
      url: 'api/issues/1', 
      type: 'DELETE', 
      data: {
        github_id: this.model.get('number'),
        repository: this.model.get('repository_name')
      }
    });

    this.model.destroy()
    this.remove();
  }
})