(function($){

	//Setup
	var $active = $('.isActive'),
		$slide = $('.item'),
		$thumb = $('.preview'),
		$slideNavPrev = $('#hSlidePrev'),
		$slideNavNext = $('#hSlideNext'),
		$slider = $('.h-slider'),
		$currentSlide = 0,
		$easing = Power3.easeInOut;

	//Init
	function init(){

		//Set inactive slide and thumb to opacity 0 and translateX -100%
		TweenLite.set($slide.not($active), {x: '-100%', autoAlpha: 0});
		TweenLite.set($thumb.not($active), {x: '-100%', autoAlpha: 0});

		//Set the previous button inactive
		TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
	}

	init();

	/*Slide Functions*/
	function goToNext(){

	}

	function goToPrev(){

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


})($);