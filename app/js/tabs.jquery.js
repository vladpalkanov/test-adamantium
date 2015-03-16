var tabs = (function(){

	return {

		init: function(){

			$('.tabs__controls-link').on('click', function(e){
				e.preventDefault();

				var item = $(this).closest('.tabs__controls-item'),
						contentItems = item.closest('.tabs').find('.tabs__item'),
						itemPosition = item.index();

				contentItems.eq(itemPosition)
						.add(item)
						.addClass('active')
						.siblings()
						.removeClass('active');

			});

		}//init

	}


})();