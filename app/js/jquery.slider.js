var slider = (function(){

	//private
	var
		_flag = true,
		_timerDuration = 6000,
		_timer = 0;

	return {

		init: function(){

			var _this = this;

			//dots creating
			_this.createDots();
			// autoslide
			_this.autoSlide();


			$('.slider__controls-button').on('click',
				function(e){
					e.preventDefault();

					var
						$this = $(this),
						slides = $this.closest('.slider').find('.slider__item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						prevSlide = activeSlide.prev(),
						firstSlide = slides.first(),
						lastSlide = slides.last();
					if($this.hasClass('next')) {

						if(nextSlide.length) {
							_this.moveSlide(nextSlide, 'forward');
						} else {
							_this.moveSlide(firstSlide, 'forward');
						}

					} else {

						if(prevSlide.length) {
							_this.moveSlide(prevSlide, 'backward');
						} else {
							_this.moveSlide(lastSlide, 'backward');
						}

					}

			});

			$('.slider__dots-link').on('click',
				function(e){
					e.preventDefault();

					var
						$this = $(this);
						dots = $this.closest('.slider').find('.slider__dots-item'),
						activeDot = dots.filter('.active'),
						dot = $this.closest('.slider__dots-item'),
						curDotNum = dot.index(),
						direction = activeDot.index() < curDotNum ?
							'forward': 'backward',
						reqSlide = $this.closest('.slider')
							.find('.slider__item').eq(curDotNum);

					if(!dot.hasClass('active')) {
						_this.clearTimer();
						_this.moveSlide(reqSlide, direction);
					}
					

			});


		},

		moveSlide: function(slide, direction) {
			var
				_this = this,
				container = slide.closest('.slider'),
				slides = container.find('.slider__item'),
				activeSlide = slides.filter('.active'),
				slideWidth = slide.width(),
				duration = 500,
				reqCssPosition = 0,
				reqSlideStrafe = 0;

			if(_flag) {

				_flag = false;

				if(direction === "forward") {
					reqCssPosition = slideWidth;
					reqSlideStrafe = -slideWidth;
				} else if (direction === "backward") {
					reqCssPosition = -slideWidth;
					reqSlideStrafe = slideWidth;
				}

				slide.css('left', reqCssPosition).addClass('inslide');

				var movableSlide = slides.filter('.inslide');

				activeSlide
					.animate({left: reqSlideStrafe}, duration);

				movableSlide
					.animate({left: 0}, duration, function(){
						var $this = $(this);

						slides.css('left', '0').removeClass('active');

						$this.toggleClass('inslide active');

						_this.setActiveDot(container.find('.slider__dots'));

						_flag = true;

					});
			}
		},

		createDots: function(){
			var
				_this = this;
				container = $('.slider');

			var
				dotMarkup ='<li class="slider__dots-item">\
											<a class="slider__dots-link"></a>\
										</li>';

			container.each(function(){
				var
						$this = $(this),
						slides = $this.find('.slider__item'),
						dotContainer = $this.find('.slider__dots');

				for(var i = 0; i< slides.length; i++) {
					dotContainer.append(dotMarkup);
				}

				_this.setActiveDot(dotContainer);

			});
		},

		setActiveDot: function(container){
			var
				slides = container
					.closest('.slider')
					.find('.slider__item');

			container
				.find('.slider__dots-item')
				.eq(slides.filter('.active').index())
				.addClass('active')
				.siblings()
				.removeClass('active');
		},

		autoSlide: function(){
			var
				_this = this;

			_timer = setInterval(function(){
				var
					slides = $('.slider__list .slider__item'),
					activeSlide = slides.filter('.active'),
					nextSlide = activeSlide.next(),
					firstSlide = slides.first();

					if(nextSlide.length) {
						_this.moveSlide(nextSlide, 'forward');
					} else {
						_this.moveSlide(firstSlide, 'forward');
					}

			}, _timerDuration);
		},

		clearTimer: function(){
			if(_timer) {
				clearInterval(_timer);
				this.autoSlide();
			}
		}

	}//public

})();