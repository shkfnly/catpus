Catpus.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',

  tasks: function(){
    if (!this._tasks) {
      this._tasks = new Catpus.Collections.Tasks([], {card: this});
    }
    return this._tasks;
  },

  parse: function(payload){
    if(payload.tasks){
      this.tasks().set(payload.tasks, { parse: true });
      delete payload.tasks;
    }
    return payload;
  }
})