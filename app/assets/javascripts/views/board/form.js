Catpus.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/form'],
  tagName: 'form',
  className: 'board-form',
  events: {
    'submit': 'submit'
  },
  initialize: function(options){
    this.user = options.user;
    this.repositories = this.user.repositories();
    this.model = new Catpus.Models.Board();
    this.collection = this.user.boards();
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
    debugger
    data.board.repository_url = additionalData[0];
    data.board.repository_id = additionalData[1];
    data.board.pushed_at = additionalData[2];
    data.board.repository_name = additionalData[3];
    this.model.save(data, {
      success: function(){
        this.collection.add(this.model);
        Backbone.history.navigate('users/' + this.user .id, {trigger: true})
      }.bind(this)
    })
  }

})