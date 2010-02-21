(function($){
	
	$.hintup = function() {
	  $("input.hintup").each(function() {
	    $(this)
	      .val($(this).attr("title"))
	      .focus(function() {$(this).val("");})
        .blur(function() {$(this).val($(this).attr("title"))});
    });
	};

})(jQuery);
