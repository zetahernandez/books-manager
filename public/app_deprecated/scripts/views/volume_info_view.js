BooksManager.VolumeInfoView = Ember.View.extend({
  templateName: 'volumeInfoTemplate',
  didInsertElement: function () {
    if (this.$('.sidebar-box').height() < 90) {
      this.$('.btn').fadeOut();
    }
  },
  readMore: function () {
    var $readMoreBtn, $sideBarChildrens, $sidebarBox, totalHeight;
    // IE 7 doesn't even get this far. I didn't feel like dicking with it.
    totalHeight = 0;
    $readMoreBtn = this.$('.btn');
    $sidebarBox = this.$('.sidebar-box');
    $sideBarChildrens = $sidebarBox.children();

    // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
    $sideBarChildrens.each(function () {
      totalHeight += $(this).height();
      // FAIL totalHeight += $(this).css("margin-bottom");
    });
    // Set height to prevent instant jumpdown when max height is removed

    $sidebarBox.css({
      "height": $sidebarBox.height(),
      "max-height": 9999
    }).animate({
      "height": totalHeight
    });
    // fade out read-more
    $readMoreBtn.fadeOut();
    // prevent jump-down
    return false;
  }
});