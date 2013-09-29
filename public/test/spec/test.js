/*global describe, it */
'use strict';

(function () {
  Ember.testing = true;
  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        should.exist(BooksManager);
      });
       it('asd should run here few assertions', function () {
        should.exist(BooksManager);
      });
    });
  });
})();