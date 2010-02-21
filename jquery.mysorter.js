(function($){
	
	$.fn.sortable = function(opt) {
	  options = $.extend({colHint: false}, opt);
	  return this.each(function() {
          var $table = $(this);
          $('th', $table).each(function(column) {
               var $header = $(this);
               //代表可以排序
               if ($header.metadata().sortType) {
                  //按字母顺序进行排序
                  $header
                      .addClass('clickable')
                      .click(function() {
                          $header.siblings().removeClass('asc').removeClass('desc');
                          $header.hasClass('asc') ? 
                            $header.removeClass('asc').addClass('desc'): 
                            $header.removeClass('desc').addClass('asc');
                          var rows = $table.find('tbody > tr').get();

                          if ($header.metadata().sortType == "alpha") {
                            rows.sort(function(a, b) {
                                var keyA = $(a).children('td').eq(column).text().toUpperCase();
                                var keyB = $(b).children('td').eq(column).text().toUpperCase();

                                if (keyA > keyB) {
                                    return ($header.hasClass('asc')) ? 1 : -1;
                                  }
                                if (keyA < keyB) {
                                  return ($header.hasClass('asc')) ? -1 : 1;
                                }
                                return 0;                       
                            });
                          }
                          
                          if ($header.metadata().sortType == "numeric") {
                            rows.sort(function(a, b) {
                                var keyA = parseFloat($(a).children('td').eq(column).text());
                                var keyB = parseFloat($(b).children('td').eq(column).text());

                                if (keyA > keyB) {
                                    return ($header.hasClass('asc')) ? 1 : -1;
                                  }
                                if (keyA < keyB) {
                                  return ($header.hasClass('asc')) ? -1 : 1;
                                }
                                return 0;                       
                            });
                          }
                          
                          if (options.colHint) {
                            $(rows).each(function  () {
                              $(this).children('td').removeClass("sort_highlight");
                              $(this).children('td').eq(column).addClass("sort_highlight");
                            });
                          }

                          $.each(rows, function(index, row) {
                              $table.find('tbody').append(row);
                          });
                      });
               }
          });
	    
    });
	};
})(jQuery);
