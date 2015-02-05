Catpus.Collections.Repos = Backbone.Collection.extend({
  url: 'api/repos',
  model: Catpus.Models.Repo
});

Catpus.Collections.repos = new Catpus.Collections.Repos()