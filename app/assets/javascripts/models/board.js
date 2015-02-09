Catpus.Models.Board = Backbone.Model.extend({
  defaults: { board :{
    id: null,
    user_id: null,
    repository_url: null,
    repository_id: null,
    repository_name: null
    }
  },

  urlRoot: 'api/boards',

  members: function(){
    if(!this._members) {
      this._members = new Catpus.Collections.Users([]);
    }
    return this._members;
  },

  lists: function(){
    if (!this._lists) {
      this._lists = new Catpus.Collections.Lists([], {board: this});
    }
    return this._lists;
  },

  repository: function(){
    if (!this._repository) {
      this._repository = new Catpus.Models.Repository([], {board: this});
    }
    return this._repository;
  },

  parse: function(payload){
    if (payload.members){
      this.members().set(payload.members, { parse: true});
      delete payload.members;
    }

    if (payload.lists) {
      this.lists().set(payload.lists, { parse: true });
      delete payload.lists;
    }

    return payload;
  }
});