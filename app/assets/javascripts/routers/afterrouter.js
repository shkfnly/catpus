Catpus.Routers.AfterRouter = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main')
    this.model = new Catpus.Models.User({id: current_user_id})
  },

  routes: {
    '#' : 'Dashboard',
    'users/:id': 'Dashboard',
  },

  Dashboard: function(){
    // Catpus.Collections.boards.fetch();
    this.model.fetch({success: function(){
      var view = new Catpus.Views.Dashboard({ 
        model: this.model,
        collection: this.model.boards()
      });
      this._swapView(view); 
      var form = new Catpus.Views.BoardForm({ user: this.model, 
                                               });
       this.$rootEl.append(form.render().$el);
    }.bind(this)}) 
  },  

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }

})