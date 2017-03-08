(function($){

    //Setup
    var $activeSlide = $('.active'),
        $hSlide = $('.slide'),
        $slidePreview = $('#slide-preview img')
        $slideNavPrev = $('.slideNavPrev'),
        $slideNavNext = $('.slideNavNext'),
        $slideNavPrevA = $('.slideNavPrev a'),
        $slideNavNextA = $('.slideNavNext a'),
        $slider = $('#slider');

    //Init function
    function init(){

        TweenLite.set($hSlide.not($activeSlide), { autoAlpha: 0});

        TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
    }

    init();

    /**Vertical parallax**/
    //function

    /**Next & Previous slide function**/
    //Go to Next slide
    function goToNextSlide(slideOut, slideIn){

        var tl = new TimelineLite(),
            slideOutLeft = slideOut.find('> .split-left img'),
            slideOutRight = slideOut.find('> .split-right img'),
            slideInLeft = slideIn.find('> .split-left img'),
            slideInRight = slideIn.find('> .split-right img'),
            index = slideIn.index(),
            size = $('#slider .slide').length;

            console.log(size);
            console.log(index);

        //Prevent going to blank side
        if( slideIn.length !== 0){

            tl
              .set(slideIn, {autoAlpha: 1, className: '+=active'})
              .set([slideInLeft, slideInRight], {x:'-50%', autoAlpha: 1})
              .set(slideOut, {className: '-=active'})
              .set([slideOutLeft, slideOutRight], {x:'0', autoAlpha: 1})
              .to(slideInLeft, 0.5, {x:'+=50%', ease: Power3.easeInOut}, 0)
              .to(slideOutLeft, 0.5, {x:'+=50%', ease: Power3.easeInOut}, 0.5)
              .to(slideInRight, 0.45, {x:'+=50%', ease: Power3.easeInOut}, 0.15)
              .to(slideOutRight, 1, {x:'+=100%', ease: Power3.easeInOut}, 0.5);

        }

        //Fade in arrow down
        TweenLite.set($slideNavPrev, {autoAlpha: 1});

        //Fade out arrow up on last slide
        if( index === size ){
            TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
        }
    }

    //Go to Previous slide
    function goToPrevSlide(slideOut, slideIn){

        var tl = new TimelineLite(),
            slideOutLeft = slideOut.find('>.split-left img'),
            slideOutRight = slideOut.find('>.split-right img'),
            slideInLeft = slideIn.find('>.split-left img'),
            slideInRight = slideIn.find('>.split-right img'),
            previewIn = $(),
            index = slideIn.index(),
            size = $('#slider .slide').length;

        //Prevent going to blank side
        if( slideIn.length !== 0){

            tl
              .set(slideIn, {autoAlpha: 1, className: '+=active'})
              .set([slideInLeft, slideInRight], {x:'50%', autoAlpha: 1})
              .set(slideOut, {className: '-=active'})
              .set([slideOutLeft, slideOutRight], {x:'0', autoAlpha: 1})
              .to(slideInRight, 0.5, {x:'-=50%', ease: Power3.easeInOut}, 0)
              .to(slideOutRight, 0.5, {x:'-=50%', ease: Power3.easeInOut}, 0.25)
              .to(slideInLeft, 0.45, {x:'-=50%', ease: Power3.easeInOut}, 0.15)
              .to(slideOutLeft, 0.5, {x:'-=100%', ease: Power3.easeInOut}, 0.5);

        }

        //Fade in arrow down
        TweenLite.set($slideNavNext, {autoAlpha: 1});

        //Fade out arrow up on last slide
        if( index === 1 ){
            TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
        }
    }

    /**Next & Previous preview img function**/
    //Go to Next preview
    function goToNextPreview(previewIn, previewOut){

        var tl = new TimelineLite(),
            index = previewIn.index(),
            size = $('#slide-preview .preview').length;

            console.log(size);
            console.log(index);


        if( previewIn.length !== 0){

            tl
              .set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=active'})
              .set(previewOut, {className: '-=active'})
              .to(previewOut, 0.5, {x: '+=100%', ease: Power3.easeInOut}, 0)
              .to(previewIn, 0.5, {x: '+=100%', ease: Power3.easeInOut}, 0);
        }
        else{
            tl
              .set(previewOut, {x: '100%', autoAlpha: 1, className: '+=active'})
              .set(previewIn, {x: '100%', className: '-=active'})
              .to(previewOut)
        }
    }

    //Go to Previous preview
    function goToPrevPreview(previewIn, previewOut){

        var tl= new TimelineLite(),
            index = previewIn.index(),
            size = $('#slide-preview .preview').length;

    }

    /**Nav click**/
    //Go to next slide
    $slideNavNext.click(function(e){
        
        e.preventDefault();

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').next('.slide'),
            previewIn = $('.preview.active'),
            previewOut = $('.preview.active').next('.preview'); 

        goToNextSlide(slideOut, slideIn);   
    });

    //Go to previous slide
    $slideNavPrev.click(function(e){
        
        e.preventDefault();            

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').prev('.slide'),
            previewIn = $('.preview.active'),
            previewOut = $('.preview.active').prev('.preview'); 

        goToPrevSlide(slideOut, slideIn);
    });

})($);