BooksManager.VolumesView = Ember.View.extend(Ember.ViewTargetActionSupport, {
  /**
   * Observes in VolumesController the propery activeTab
   * when it change then we call the method to set active Tab
   */
  activeTabDidChange: function() {
    if (this.state === 'inDOM') this.setActiveTab();
  }.observes('controller.activeTab'),

  /**
   * when the view is added the call the method to set active Tab
   *
   */
  didInsertElement: function() {
    if (this.state === 'inDOM') this.setActiveTab();
  },

  setActiveTab: function() {
    $('.active').removeClass('active');
    var activeTab = this.get('controller.activeTab');
    this.$("a[data-tab='%@']".fmt(activeTab)).parent().addClass('active');
  }
});