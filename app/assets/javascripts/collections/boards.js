Catpus.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: Catpus.Models.Board
});

Catpus.Collections.board = new Catpus.Collections.Boards()