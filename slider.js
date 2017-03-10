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

	//Init
	function init(){

		//Set inactive slide and thumb to opacity 0 and translateX -100%
		TweenLite.set($slide.not($active), {autoAlpha: 0});
		TweenLite.set($preview.not($active), {autoAlpha: 0});

		//Set the previous button inactive
		TweenLite.set($slideNavPrev, {autoAlpha: 0.2});

		//Get url of <img> and place it as background img
		$('.preview, .item').each(function(){

			var imgSrc = $(this).attr('data-hslide-img');
			$(this).css('background-image', 'url('+ imgSrc +')');
		});
	}

	init();


	/*Slide Functions*/
	function goToNext(){

		var slideTl = new TimelineLite(),
			previewTl = new TimelineLite(),
			slideInLeft = $leftSlide.find('.item.isActive').next('.item'),
			slideInRight = $rightSlide.find('.item.isActive').next('.item'),
			slideOutLeft = $leftSlide.find('.item.isActive'),
			slideOutRight =  $rightSlide.find('.item.isActive'),
			slideIndex = slideInLeft.index(),
			size = $size;
			//direction = '+=100%';

		var previewOut =  $('.preview.isActive'),
			previewIn = $('.preview.isActive').next('.preview');

		if( slideInLeft.length !== 0 ){

			slideTl
				.set([slideInLeft, slideInRight], {x: '-100%',autoAlpha: 1, className: '+=isActive'})
				.set([slideOutLeft, slideOutRight], {x: '0', autoAlpha: 1, className: '-=isActive'})
				.to(slideInLeft, 0.5, {x: '+=100%', ease: $easing}, 0.15)
				.to(slideOutLeft, 0.5, {x: '+=100%', ease: $easing}, 0.5)
				.to(slideInRight, 0.5, {x: '+=100%', ease: $easing}, 0.35)
				.to(slideOutRight, 1, {x: '+=100%', ease: $easing}, 0.5);
		}

		if( previewIn.length !==0 ){

			previewTl
				.set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=isActive'})
				.set(previewOut, {x: '0', autoAlpha: 1, className: '-=isActive'})
				.to(previewOut, 0.15, {x: '+=100%', ease: $easing}, 0)
				.to(previewIn, 0.15, {x: '+=100%', ease: $easing}, 0);
		}

		//FadeIn arrow Prev
		TweenLite.set($slideNavPrev, {autoAlpha: 1});

		//FadeOut arrow Next on last slide
		if( slideIndex === size ){

			TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease: Linear.easeNone});
		}
	}

	function goToPrev(){

		var slideTl = new TimelineLite(),
			slideInLeft = $leftSlide.find('.item.isActive').prev('.item'),
			slideInRight = $rightSlide.find('.item.isActive').prev('.item'),
			slideOutLeft = $leftSlide.find('.item.isActive'),
			slideOutRight =  $rightSlide.find('.item.isActive'),
			slideIndex = slideInLeft.index();

		if( slideInLeft.length !== 0 ){

			slideTl
				.set([slideInLeft, slideInRight], {x: '100%',autoAlpha: 1, className: '+=isActive'})
				.set([slideOutLeft, slideOutRight], {x: '0', autoAlpha: 1, className: '-=isActive'})
				.to(slideInRight, 0.5, {x: '-=100%', ease: $easing}, 0)
				.to(slideOutRight, 0.5, {x: '-=100%', ease: $easing}, 0.25)
				.to(slideInLeft, 0.45, {x: '-=100%', ease: $easing}, 0.15)
				.to(slideOutLeft, 0.5, {x: '-=100%', ease: $easing}, 0.5);
		}

		//FadeIn arrow Next
		TweenLite.set($slideNavNext, {autoAlpha: 1});

		//FadeOut arrow Prev on last slide
		if( slideIndex === 1 ){

			TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease: Linear.easeNone});
		}

	}

	/*Navigation*/
	//Go to previous
	$slideNavPrev.click(function(e){

		e.preventDefault();

		goToPrev();

	});

	//Go to next
	$slideNavNext.click(function(e){

		e.preventDefault();

		goToNext();
	});

	//Next || Previous nav
	/*
	$('.h-slider__nav').click(function(e){

		$direction = $(this).attr('data-hslide-cursor');
	
		if( $direction = "previous" ){
			
			direction = "right";
		}
		else{
			direction = "left";
		}

		//var direction = $direction = "previous" ? "right" : "left";
	});
	*/


})($);