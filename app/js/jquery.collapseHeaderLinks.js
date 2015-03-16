var collapseHeaderLinks = (function($){

	var
		hiddenElementsMarginTop = 0,
		hiddenWidths = [];


	return {

		init: function(){
			var _this = this,
					links = $('.main-header__link');

			this.collapse();
			$(window).on('resize', this.collapse);
			$('.main-header__collapse-actions').on('click',
				function(e){
					e.preventDefault();
					$('.main-header__link.collapsed').toggleClass('active');
			});

		},

		collapse: function(){
			var
				links = $('.main-header__link');
				visibleLinks = links.filter(':not(.collapsed)'),

				leftVisibleLinks = visibleLinks.filter('.pull-left'),
				rightVisibleLinks = visibleLinks.filter('.pull-right'),

				headerWidth = $('.main-header').outerWidth(),
				headingWidth = $('.main-header__heading').outerWidth(),

				linksWidth = 0,
				freeSpace = 0,

				collapseActionsButton =
					$('.main-header__collapse-actions'),
				menuButton = 
					$('.main-header__menu-button');

			for(var i =0; i < visibleLinks.size(); i++) {
				linksWidth += $(visibleLinks[i]).outerWidth();
			}

			freeSpace = headerWidth -
				(headingWidth + linksWidth +
				collapseActionsButton.outerWidth() +
				menuButton.outerWidth());

			var
				leftVisibleLast = leftVisibleLinks.last(),
				rightVisibleLast = rightVisibleLinks.last(),
				hiddenLinks = links.filter('.collapsed');

			if( hiddenLinks.size() == 0) {
				if(freeSpace <= 0 ) {
					collapseActionsButton.addClass('active');
				} else {
					collapseActionsButton.removeClass('active');
				}
			}

			while(freeSpace <= 0) {
				var
					leftElemWidth = leftVisibleLast.outerWidth(),
					rightElemWidth = rightVisibleLast.outerWidth();

				freeSpace += leftElemWidth + rightElemWidth;

				if(leftVisibleLast.hasClass('pull-left')) {
					hiddenWidths.push(leftElemWidth);
					leftVisibleLast
						.addClass('collapsed')
						.css('margin-top', hiddenElementsMarginTop);
					hiddenElementsMarginTop += 30;
				}

				if(rightVisibleLast.hasClass('pull-right')) {
					hiddenWidths.push(rightElemWidth)
					rightVisibleLast.addClass('collapsed')
						.addClass('collapsed')
						.css('margin-top', hiddenElementsMarginTop);
					hiddenElementsMarginTop += 30;
				}

				leftVisibleLast = leftVisibleLast
					.prev('.pull-left:not(.collapsed)');
				rightVisibleLast = rightVisibleLast
					.prev('.pull-right:not(.collapsed)');

			}

			var
				twoLastHiddenWidth =
					(hiddenWidths[hiddenWidths.length -1] || 0) +
					(hiddenWidths[hiddenWidths.length -2] || 0);

			hiddenLinks = links.filter('.collapsed');

			while( freeSpace > twoLastHiddenWidth &&
				hiddenLinks.size() > 0) {

					for(var i = 0; i< 2; i++) {
						hiddenLinks.last()
							.removeClass('collapsed')
							.css('margin-top', 0);
						hiddenLinks = links.filter('.collapsed');
						hiddenElementsMarginTop = hiddenLinks.size() * 30;
					}

				}

				//if(freeSpace > 0 && hiddenLinks.size() == 0)

		}

	};

})(jQuery);