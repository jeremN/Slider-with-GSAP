(function($){

	//Setup
	var $active = $('.isActive'),
		$slide = $('.item'),
		$thumb = $('.preview'),
		$slideNavPrev = $('#hSlidePrev'),
		$slideNavNext = $('#hSlideNext'),
		$slider = $('.h-slider'),
		$currentSlide = 0,
		$currentThumb = 1,
		$slideTo = 'left',
		$size = $('.left-image .item').length,
		$easing = Power3.easeInOut;

		console.log($size);

	//Init
	function init(){

		//Set inactive slide and thumb to opacity 0 and translateX -100%
		TweenLite.set($slide.not($active), {x: '-100%', autoAlpha: 0});
		TweenLite.set($thumb.not($active), {x: '-100%', autoAlpha: 0});

		//Set the previous button inactive
		TweenLite.set($slideNavPrev, {autoAlpha: 0.2});

		//Get url of <img> and place it as background img
		$('.preview, .item').each(function(){

			var imgSrc = $(this).children('img').attr('src');
			$(this).css('background-image', 'url('+ imgSrc +')');
		});
	}

	init();


	/*Slide Functions*/
	function goToNext(object, direction){

		var slideObj = object,
			slideDirection,
			slideTl = new TimelineLite(),
			slideOut = $slide.hasClass('isActive'),
			slideIn = $('.slide.isActive').next('.slide'),
			toLeft = '+=100%',
			toRight = '-=100%';

	}

	/*Navigation*/
	//Go to previous
	$slideNavPrev.click(function(e){

		e.preventDefault();

		goToNext($slide, slideTo);

	});

	//Go to next
	$slideNavNext.click(function(e){

		e.preventDefault();

		goToNext();
	});


})($);