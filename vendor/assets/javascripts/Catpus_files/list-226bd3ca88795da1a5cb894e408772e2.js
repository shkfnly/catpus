Catpus.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  cards: function(){
    if (!this._cards) {
      this._cards = new Catpus.Collections.Cards([], {board: this});
    }
    return this._cards;
  },

  parse: function(payload){
    if(payload.cards){
      this.cards().set(payload.cards, { parse: true });
      delete payload.cards;
    }
    return payload;
  }
})
;
