window.Catpus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(authType) {
    if(authType == 'before'){
      new Catpus.Routers.BeforeRouter();
    }
    else if (authType == 'after'){
      new Catpus.Routers.AfterRouter();
    }

    Backbone.history.start();
  }
};

$(document).ready(function(){
});
