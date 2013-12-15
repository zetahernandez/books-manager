BooksManager.Router.map(function () {
  this.resource('dashboard', {path: '/dashboard'}, function () {
    this.resource('volumes', {path: '/volumes'}, function () {
      //initial route
      this.route('home', {path: '/home'});
      this.route('categories', {path: '/categories'});
    });
    this.resource('search', {path: '/search'}, function () {
      this.route('volumes', {path: '/volumes'});
      this.route('authors', {path: '/authors'});
    });
    this.resource('upload', function () {
      this.route('general');
      this.route('upload');
    });
    this.resource('myhome', function () {
    
    });
  });
  this.resource('settings', function () {
    this.route('general');
    this.route('upload');
  });

});