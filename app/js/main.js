jQuery(document).ready(function($) {

	// slider initialization
	slider.init();

	//tabs initialization
	tabs.init();

	//on resize header links collapse
	collapseHeaderLinks.init();

	// offer additionals expandation
	expandOfferAdditionals();

	// off canvas menu translating
	toggleOffCanvasMenu();

});

function toggleOffCanvasMenu(){
	$('.main-header__menu-button').on('click', function(){
		$(this).children()
			.toggleClass('icon-bars').toggleClass('icon-close');
		$('.global-page-wrapper').toggleClass('show-nav');
	});
}

function expandOfferAdditionals(){
	$('.offer__cost').on('click', function(e){
		e.preventDefault();

		var
			$this = $(this),
			offer = $(this).closest('.offer'),
			offerAdditional = offer.find('.offer__additional')
			container = $this.closest('.tabs__list');

		if( $(window).outerWidth() >= 640) {

			var heightToAdd =
				(offer.offset().top - container.offset().top + offer.outerHeight()) //offer__additional offset
				+ offerAdditional.outerHeight(); //offer__additional height

			//var heightToAdd = 
			console.log(heightToAdd);

			container
				.css('height', 'auto')
				.css('min-height', heightToAdd);

		}

		offer.addClass('active');
		offer.siblings().removeClass('active');

	});

	$('.offer__additional-hide').on('click', function(e){
		e.preventDefault();
		var
			$this = $(this);

		$this.closest('.offer').removeClass('active');
		$this.closest('.tabs__list').css('min-height', 0);

	});

	$('.offer__additional-delete').on('click', function(e){
		e.preventDefault();
		$(this).closest('.offer').fadeOut(400);
	});
}
