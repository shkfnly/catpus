Catpus.Views.IssueForm = Backbone.View.extend({
  template: JST['issues/form'],
  tagName: 'form',
  className: 'issueForm',

  events: {
    'submit' : 'issueCreate',
    'click #issue-title' : 'formClear'
  },

  initialize: function(options){
    this.repository = options.repository
  },

  formClear: function(event){
    $(event.target).val('');
    $('textarea').html('');
  },

  render: function(){
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  issueCreate: function(event){
    event.preventDefault();
    var issueData = $(event.target).serializeJSON();
    issueData.issue.repository = this.repository.get('full_name')
    issueData.issue.repository_id = this.repository.id
    this.model = new Catpus.Models.Issue();
    this.model.save(issueData, {
      success: function(){
        this.collection.add(this.model)
      }.bind(this)
    })
    this.remove();
    $(event.target.previousSibling).prop("disabled", false)
  }
})