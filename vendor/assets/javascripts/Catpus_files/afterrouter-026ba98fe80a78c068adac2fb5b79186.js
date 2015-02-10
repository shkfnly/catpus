Catpus.Routers.AfterRouter = Backbone.Router.extend({

  initialize: function(){
    this.$rootEl = $('#main')
    this.model = new Catpus.Models.User({id: current_user_id})
  },

  routes: {
    '' : 'rootHandler',
    'dashboard': 'Dashboard',
    'boards/:id': 'BoardShow'
  },

  Dashboard: function(){
    this.model.fetch({success: function(){
      var view = new Catpus.Views.Dashboard({ 
        model: this.model,
        collection: this.model.boards()
      });
      this._swapView(view);
    }.bind(this)}) 
  },

  rootHandler: function(){
    Backbone.history.navigate('dashboard', {trigger: true})
  },

  BoardShow: function(id){
    this.model.fetch({
      success: function(){
        var board = this.model.boards().getOrFetch(id);
        var view = new Catpus.Views.BoardShow({
                        model: board
                      });
        this._swapView(view);
      }.bind(this)}
    )
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }

})
;
