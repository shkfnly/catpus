Catpus.Collections.Cards = Backbone.Collection.extend({
  model: Catpus.Models.Card,
  url: 'api/cards',
  getOrFetch: function (id) {
    var card = this.get(id),
      cards = this;
    if(!card) {
      card = new Catpus.Models.Card({ id: id });
      card.fetch({
        success: function () {
          cards.add(card);
        },
      });
    } else {
      card.fetch();
    }
    return card;
  }
})