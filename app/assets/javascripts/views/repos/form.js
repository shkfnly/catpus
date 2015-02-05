Catpus.Views.RepoForm = Backbone.View.extend({
  template: JST['repos/form'],
  tagName: 'form',
  className: 'repo-form',
  events: {
    'submit': 'submit'
  },
  initialize: function(options){
    this.user = options.user;
    this.repositories = options.repositories;
    this.listenTo(this.repositories, 'change', this.render);
  },

  render: function(){
    var content = this.template({user: this.user, model: this.model, repositories: this.repositories})
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var additionalData = $(event.target).find('select').val().split('=');
    data.repo.repository_url = additionalData[0];
    data.repo.repository_id = additionalData[1];
    this.model.save(data, {
      success: function(){
        this.collection.add(this.model);
        Backbone.history.navigate('users/' + this.user .id, {trigger: true})
      }.bind(this)
    })
  }

})