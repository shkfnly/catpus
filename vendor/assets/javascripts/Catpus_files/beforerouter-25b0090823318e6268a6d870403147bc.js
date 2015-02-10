Catpus.Routers.BeforeRouter = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main')
  },

  routes: {
    '' : 'index'
  },

  index: function(){
    console.log("Before Router Index")
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }

})
;
