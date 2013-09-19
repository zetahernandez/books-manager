BooksManager.VolumesRoute = Ember.Route.extend({

  renderTemplate: function (controller, model) {
    // categories = BooksManager.Volume.findAll(),
    console.log("render volumes");

    // categoryListController.set('model', categories);

    this.render('index');
    this.render('header', {
      outlet: 'header',
      into: 'index'
    });
  }
});

// BooksManager.VolumesIndexRoute = Ember.Route.extend({

//   // renderTemplate: function (controller, model) {

//     // console.log("render volumes.index");
//     // var categoryListController = this.controllerFor('categoryList'),
//     //   volumeListController = this.controllerFor('volumeList');

//     // BooksManager.Volume.findAll().then(function (volumes) {
//     //   volumeListController.set('model', volumes);
//     // });
//     // this.render('volumeList', {
//     //   controller: volumeListController
//     // });
//   // }
// });