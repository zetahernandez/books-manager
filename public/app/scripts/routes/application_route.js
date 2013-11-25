BooksManager.ApplicationRoute = Ember.Route.extend({
  renderTemplate: function() {
    console.log('ApplicationRoute.renderTemplate');
    this._super();
  },
  actions: {
    showLogin: function() {
      BooksManager.Route.showModal(this, 'login');
    },

    showCreateAccount: function() {
      BooksManager.Route.showModal(this,'createAccount');
    },
    /**

      Close the current modal, and destroy its state.

      @method closeModal
    **/
    closeModal: function() {
      this.render('hide_modal', {
        into: 'modal',
        outlet: 'modalBody'
      });
    },

    /**
      Hide the modal, but keep it with all its state so that it can be shown again later.
      This is useful if you want to prompt for confirmation. hideModal, ask "Are you sure?",
      user clicks "No", showModal. If user clicks "Yes", be sure to call closeModal.

      @method hideModal
    **/
    hideModal: function() {
      $('#booksmanager-modal').modal('hide');
    },

    /**
      Show the modal. Useful after calling hideModal.

      @method showModal
    **/
    showModal: function() {
      $('#booksmanager-modal').modal('show');
    },
  }
});