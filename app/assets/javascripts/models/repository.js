Catpus.Models.Repository = Backbone.Model.extend({
  urlRoot: 'api/repositories',

  collaborators: function(){
    if (!this._collaborators) {
      this._collaborators = new Catpus.Collections.Users([], {repository: this});
    }
    return this._collaborators;
  },

  contributers: function(){
    if (!this._contributers) {
      this._contributers = new Catpus.Collections.Users([], {repository: this});
    }
    return this._contributers;
  },

  issues: function(){
    if (!this._issues) {
      this._issues = new Catpus.Collections.Issues([], {repository: this});
    }
    return this._issues;
  },

  events: function(){
    if (!this._events) {
      this._events = new Catpus.Collections.Events([], {repository: this});
    }
    return this._events;
  },


  parse: function(payload){
    if(payload.collaborators){
      this.collaborators().set(payload.collaborators, { parse: true });
      delete payload.collaborators;
    }

    if(payload.contributers){
      this.contributers().set(payload.contributers, { parse: true });
      delete payload.contributers;
    }

    if (payload.issues){
      this.issues().set(payload.issues, { parse: true });
      delete payload.issues;
    }

    if (payload.events){
      this.events().set(payload.events, {parse: true });
      delete payload.events;
    }
    return payload;
  }
})