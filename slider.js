(function($){

	//Setup
	var $active = $('.isActive'),
		$slide = $('.item'),
		$preview = $('.preview'),
		$slideNavPrev = $('#hSlidePrev'),
		$slideNavNext = $('#hSlideNext'),
		$slider = $('.h-slider'),
		$leftSlide = $('.h-slider__image.left-image'),
		$rightSlide = $('.h-slider__image.right-image'),
		$currentSlide = 0,
		$currentPreview = 1,
		$size = $('#hSlider .left-image .item').length,
		$easing = Power3.easeInOut,
		$toLeft = '+=100%',
		$toRight = '-=100%';


		console.log($size);
		console.log($currentSlide);

	//Init
	function init(){

		//Set inactive slide and thumb to opacity 0 and translateX -100%
		TweenLite.set($slide.not($active), {x: '-100%',autoAlpha: 0});
		TweenLite.set($preview.not($active), {x: '-100%',autoAlpha: 0});

		//Set the previous button inactive
		TweenLite.set($slideNavPrev, {autoAlpha: 0.2});

		//Get img url and set in as a background-image of element
		getImage();
	}

	init();

	//Get image path
	function getImage(){

		$('#hSlider .preview, #hSlider .item').each(function(){

			var imgSrc = $(this).children('img').attr('src'),
				attrSrc = $(this).attr('data-hslide-img'),
				pathSrc;

			//Else if attr is set
			if( typeof attrSrc !== typeof undefined && attrSrc !== false ){

				pathSrc = attrSrc;
			}
			//Check if image is set
			else if( imgSrc !== false && imgSrc !== undefined ){

				pathSrc = imgSrc;
			}

			//Set path in element as background-image
			$(this).css('background-image', 'url('+ pathSrc +')');
		});
	}

	//Slide next/previous 
	function toSlide(direction){

		var slideTl = new TimelineLite(),
			slideInLeft,
			slideInRight,
			slideOutLeft = $leftSlide.find('.item.isActive'),
			slideOutRight = $rightSlide.find('.item.isActive'),
			slideIndex,
			size = $('#hSlider .left-image .item').length;

		var previewTl = new TimelineLite(),
			previewOut = $('.preview.isActive'),
			previewIn;

		//Go to next slide / preview
		if( direction === "left" ){

			slideInLeft = $leftSlide.find('.item.isActive').next('.item'),
			slideInRight = $rightSlide.find('.item.isActive').next('.item'),
			slideIndex = slideInLeft.index(),
			previewIn = $('.preview.isActive').next('.preview');

			//Slide
			if( slideInLeft.length !== 0 ){

				slideTl
					.set([slideInLeft, slideInRight], {x: '-100%',autoAlpha: 1, className: '+=isActive'})
					.set([slideOutLeft, slideOutRight], {x: '0', autoAlpha: 1, className: '-=isActive'})
					.to(slideInLeft, 0.5, {x: '+=100%', ease: $easing}, 0.15)
					.to(slideOutLeft, 0.5, {x: '+=100%', ease: $easing}, 0.5)
					.to(slideInRight, 0.5, {x: '+=100%', ease: $easing}, 0.35)
					.to(slideOutRight, 1, {x: '+=100%', ease: $easing}, 0.5);
			}

			//Preview
			if( previewIn.length !== 0 ){

				previewTl
					.set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=isActive'})
					.set(previewOut, {x: '0', autoAlpha: 1, className: '-=isActive'})
					.to(previewIn, 0.25, {x: '+=100%', ease: $easing}, 0.1)
					.to(previewOut, 0.25, {x: '+=100%', ease: $easing}, 0.5);

				if( $currentSlide === $size - 1 ){

					/*previewTl
						.set(previewIn, {className: '-=active'})
						.set*/
				}
			}
		}
		//Go to previous slide / preview
		else if( direction === "right" ){

			slideInLeft = $leftSlide.find('.item.isActive').prev('.item'),
			slideInRight = $rightSlide.find('.item.isActive').prev('.item'),
			slideIndex = slideInLeft.index(),
			previewIn = $('.preview.isActive').prev('.preview');

			//Slide
			if( slideInLeft.length !== 0 ){

				slideTl
					.set([slideInLeft, slideInRight], {x: '100%',autoAlpha: 1, className: '+=isActive'})
					.set([slideOutLeft, slideOutRight], {x: '0', autoAlpha: 1, className: '-=isActive'})
					.to(slideInRight, 0.5, {x: '-=100%', ease: $easing}, 0)
					.to(slideOutRight, 0.5, {x: '-=100%', ease: $easing}, 0.25)
					.to(slideInLeft, 0.45, {x: '-=100%', ease: $easing}, 0.15)
					.to(slideOutLeft, 0.5, {x: '-=100%', ease: $easing}, 0.5);
			}

			//Preview
			if( previewIn.length !== 0 ){

				previewTl
					.set(previewIn, {x:'100%', autoAlpha: 1, className: '+=isActive'})
					.set(previewOut, {x: '0', autoAlpha: 1, className: '-=isActive'})
					.to(previewOut, 0.15, {x: '-=100%', ease: $easing}, 0)
					.to(previewIn, 0.15, {x: '-=100%', ease: $easing}, 0);
			}
		}

		fadeSlideNav(slideIndex);
	}

	//Navigation button fade In/Out
	function fadeSlideNav(index){
			
		//FadeOut arrow Next on last slide
		if( index === $size - 1 ){

			TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease: Linear.easeNone});
		}
		else{

			//FadeIn arrow Next
			TweenLite.set($slideNavNext, {autoAlpha: 1});
		}

		//FadeOut arrow Prev on last slide
		if( index === 0 ){

			TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease: Linear.easeNone});
		}
		else{

			//FadeIn arrow Prev
			TweenLite.set($slideNavPrev, {autoAlpha: 1});
		}
	}

	//Next/Previous navigation
	$('.h-slider__nav').click(function(e){

		e.preventDefault();

		$slideNav = $(this).attr('data-hslide-cursor');
	
		if( $slideNav === "previous" || $(this).hasClass('previous') ){
			
			direction = "right";
			//goToPrev();
			$currentSlide--;
		}
		else if( $slideNav === "next" || $(this).hasClass('next') ){

			direction = "left";
			//goToNext();
			$currentSlide++;
		}
		else{

			direction = "left";
			//goToNext();
			$currentSlide++;
		}

		toSlide(direction);
		console.log($currentSlide);

	});


})($);