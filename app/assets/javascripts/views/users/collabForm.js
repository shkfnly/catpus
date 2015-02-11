Catpus.Views.CollabForm = Backbone.View.extend({
  template: JST['users/collabForm'],
  tagName: 'form',
  className: 'collabForm',

  events: {
    'submit' : 'collabCreate',
    'click #collab-name' : 'formClear'
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

  collabCreate: function(event){
    event.preventDefault();
    collabData = $(event.target).serializeJSON();
    collabData.user.repository = this.repository.get('full_name')
    collabData.user.repository_id = this.repository.id
    this.model = new Catpus.Models.User();
    this.model.save(collabData, {
      success: function(){
        this.collection.add(this.model)
      }.bind(this)
    })

    // $.ajax({
    //   url: 'api/users',
    //   type: 'POST',
    //   data: collabData,
    //   success: function(){

    //     this.collection.add(this.model)
    //   }.bind(this)
    // })
    this.remove();
    $(event.target.previousSibling).prop("disabled", false)
  }
})