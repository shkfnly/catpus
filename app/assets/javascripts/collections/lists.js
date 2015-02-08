Catpus.Collections.Lists = Backbone.Collection.extend({
  url: 'api/lists',
  model: Catpus.Models.List,
  comparator: 'ord',
  
  initialize: function(models, options) {
    this.board = options.board;
  }
});1