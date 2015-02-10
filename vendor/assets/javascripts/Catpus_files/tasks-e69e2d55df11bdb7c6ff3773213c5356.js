Catpus.Collections.Tasks = Backbone.Collection.extend({
  model: Catpus.Models.Task,
  url: '/api/tasks',

  initialize: function (models, options) {
    this.card = options.card;
  },
})
;
