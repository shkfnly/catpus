Catpus.Models.User = Backbone.Model.extend({
  urlRoot: 'users',

  repositories: function(){
    if(!this._repositories) {
      this._repositories = new Catpus.Collections.Repositories([], {user: this });
    }
    return this._repositories;
  },

  parse: function(payload){
    if(payload.repositories){
      this.repositories().set(payload.repositories, { parse: true });
      delete payload.repositories;
    }
    return payload

  }
});