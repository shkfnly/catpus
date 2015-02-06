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
// Catpus.initialize();
//   window.CatpusApp = function(Backbone, Marionette){
//   App = new Marionette.Application();
//   App.addRegions({headerRegion: "#header",
//                   mainRegion: "#main",
//                   footerRegion: "#footer"});
//   App.on("intialize:after", function(){
//     if(Backbone.history){
//       Backbone.history.start()
//     }
//   })
//   return App;
// }
// CatpusApp = CatpusApp(Backbone, Marionette)
// $(function() {CatpusApp.start();});
});
