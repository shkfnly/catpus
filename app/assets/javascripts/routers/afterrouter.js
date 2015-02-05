Catpus.Routers.AfterRouter = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main')
    this.model = new Catpus.Models.User({id: current_user_id})
  },

  routes: {
    '' : 'landing',
    'users/:id': 'RepoIndex'
  },

  RepoIndex: function(){
    
    Catpus.Collections.repos.fetch();
    var view = new Catpus.Views.ReposIndex({
      collection: Catpus.Collections.repos});
    this._swapView(view);
    var newRepo = new Catpus.Models.Repo();
    this.model.fetch({success: function(){ 
      var form = new Catpus.Views.RepoForm({user: this.model, repositories: this.model.repositories(), model: newRepo, collection: Catpus.Collections.repos});
       this.$rootEl.append(form.render().$el);
    }.bind(this)}) 
  },  

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }

})