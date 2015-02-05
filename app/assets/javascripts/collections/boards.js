Catpus.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: Catpus.Models.Board
});

Catpus.Collections.boards = new Catpus.Collections.Boards()