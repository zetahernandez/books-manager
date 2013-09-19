BooksManager.Router.map(function () {

  this.resource('volumes', {
      path: '/'
    },

    function () {
      this.route('search', {
        path: '/volumes/search'
      });
      this.route('detail', {
        path: "/volumes/:volume_id"
      });

    });
  this.resource('settings', function () {
    this.route('general');
    this.route('upload');
  });
});