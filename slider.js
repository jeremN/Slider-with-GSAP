(function($){

	//Setup
	var $active = $('.isActive'),
		$slide = $('.item'),
		$thumb = $('.preview'),
		$slideNavPrev = $('#hSlidePrev'),
		$slideNavNext = $('#hSlideNext'),
		$slider = $('.h-slider'),
		$leftSlide = $('.h-slider__image.left-image'),
		$rightSlide = $('.h-slider__image.right-image'),
		$currentSlide = 0,
		$currentThumb = 1,
		$size = $('.left-image .item').length,
		$easing = Power3.easeInOut,
		$toLeft = '+=100%',
		$toRight = '-=100%';


		console.log($size);

	//Init
	function init(){

		//Set inactive slide and thumb to opacity 0 and translateX -100%
		TweenLite.set($slide.not($active), {autoAlpha: 0});
		TweenLite.set($thumb.not($active), {autoAlpha: 0});

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
	function goToNext(direction){

		var slideTl = new TimelineLite(),
			slideInLeft = $leftSlide.find('.item.isActive').next('.item'),
			slideInRight = $rightSlide.find('.item.isActive').next('.item'),
			slideOutLeft = $leftSlide.find('.item.isActive'),
			slideOutRight =  $rightSlide.find('.item.isActive'),
			slideIndex = slideInLeft.index();

		if( slideInLeft.length !== 0 ){

			slideTl
				.set([slideInLeft, slideInRight], {x: '-100%',autoAlpha: 1, className: '+=isActive'})
				.set([slideOutLeft, slideOutRight], {x: '0', autoAlpha: 1, className: '-=isActive'})
				.to(slideInLeft, 0.5, {x: '+=100%', ease: $easing}, 0.15)
				.to(slideOutLeft, 0.5, {x: '+=100%', ease: $easing}, 0.5)
				.to(slideInRight, 0.5, {x: '+=100%', ease: $easing}, 0.35)
				.to(slideOutRight, 0.5, {x: '+=100%', ease: $easing}, 0.5);
		}

		//FadeIn arrow Prev
		TweenLite.set($slideNavPrev, {autoAlpha: 1});

		//FadeOut arrow Next on last slide
		if( slideIndex === $size ){

			TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease: Linear.easeNone});
		}
	}

	/*Navigation*/
	//Go to previous
	$slideNavPrev.click(function(e){

		e.preventDefault();

		var slideLeft = $leftSlide.find('> .item.isActive');

		goToNext($toLeft);

	});

	//Go to next
	$slideNavNext.click(function(e){

		e.preventDefault();

		goToNext();
	});

	//Next || Previous nav
	/*if(){

	}*/


})($);