Catpus.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: Catpus.Models.Board,

  getOrFetch: function (id) {
    var board = this.get(id),
      boards = this;
    if(!board) {
      board = new Catpus.Models.Board({ id: id });
      board.fetch({
        success: function () {
          boards.add(board);
        },
      });
    } else {
      board.fetch();
    }
    return board;
  }
});

Catpus.Collections.boards = new Catpus.Collections.Boards()