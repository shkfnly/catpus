Catpus.Models.User = Backbone.Model.extend({
  urlRoot: 'users',

  repositories: function(){
    if(!this._repositories) {
      this._repositories = new Catpus.Collections.Repositories([], {user: this });
    }
    return this._repositories;
  },

  boards: function(){
    if(!this._boards){
      this._boards = new Catpus.Collections.Boards([], {user: this});
    }
    return this._boards;
  },

  parse: function(payload){
    if(payload.repositories){
      this.repositories().set(payload.repositories, { parse: true });
      delete payload.repositories;
    }
    if(payload.boards){
      this.boards().set(payload.boards, { parse: true });
      delete payload.boards;
    }
    return payload

  }
});