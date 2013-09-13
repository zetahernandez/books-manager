
BooksManager.Store = DS.Store.extend({
  revision: 11,
  adapter: BooksManager.ApplicationAdapter.create()
  // if you're looking at this, you probably know what you're doing...
});