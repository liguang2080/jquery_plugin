(function($){
	
	$.fn.set_center = function() {
	  return this.each(function() {
	    var viewportWidth = $(window).width(), viewportHeight = $(window).height();
      var scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft();
      $(this).css({position: "absolute", left: viewportWidth/2 + scrollLeft, top: viewportHeight/2 + scrollTop});
    });
	};

})(jQuery);
