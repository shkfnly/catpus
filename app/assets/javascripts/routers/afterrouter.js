Catpus.Routers.AfterRouter = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main')
    this.model = new Catpus.Models.User({id: current_user_id})
  },

  routes: {
    '#' : 'rootHandler',
    'dashboard': 'Dashboard',
    'boards/:id': 'BoardShow'
  },

  Dashboard: function(){
    // Catpus.Collections.boards.fetch();
    this.model.fetch({success: function(){
      var view = new Catpus.Views.Dashboard({ 
        model: this.model,
        collection: this.model.boards()
      });
      this._swapView(view);

      var issues = new Catpus.Views.IssueIndex({
        model: this.model,
        collection: this.model.issues()
      });

      this.$rootEl.append(issues.render().$el);

      var form = new Catpus.Views.BoardForm({ user: this.model, 
                                               });
       this.$rootEl.append(form.render().$el);
    }.bind(this)}) 
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

  rootHandler: function(){
    Backbone.history.navigate('dashboard', {trigger: true})
  },
  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }

})