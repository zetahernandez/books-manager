DS.RESTAdapter.map('volume', {
  volumeInfo: {
    embedded: 'always'
  }
});
BooksManager.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});