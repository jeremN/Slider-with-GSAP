(function($){

    //Setup
    var $active = $('.active'),
        $hSlide = $('.slide'),
        $hPreview = $('.preview'),
        $slideNavPrev = $('.slideNavPrev'),
        $slideNavNext = $('.slideNavNext'),
        $slideNavPrevA = $('.slideNavPrev a'),
        $slideNavNextA = $('.slideNavNext a'),
        $slider = $('#slider'),
        $easing = Power3.easeInOut;

    //Init function
    function init(){

        TweenLite.set($hSlide.not($active), { autoAlpha: 0});
        TweenLite.set($hPreview.not($active), { autoAlpha: 0});

        TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
    }

    init();

    /**Vertical parallax**/
    //function

    /**Next & Previous slide function**/
    //Go to Next slide
    function goToNext(slideOut, slideIn, previewIn, previewOut){

        var slideTl = new TimelineLite(),
            slideOutLeft = slideOut.find('> .split-left img'),
            slideOutRight = slideOut.find('> .split-right img'),
            slideInLeft = slideIn.find('> .split-left img'),
            slideInRight = slideIn.find('> .split-right img'),
            index = slideIn.index(),
            size = $('#slider .slide').length,
            thumbTl = new TimelineLite(),
            lastPreview = previewOut.prev('.preview'),
            thumbIndex = previewIn.index(),
            thumbSize = $('#slide-preview .preview').length;

        //Prevent going to blank side
        if( slideIn.length !== 0 ){

            slideTl
              .set(slideIn, {autoAlpha: 1, className: '+=active'})
              .set([slideInLeft, slideInRight], {x:'-50%', autoAlpha: 1})
              .set(slideOut, {className: '-=active'})
              .set([slideOutLeft, slideOutRight], {x:'0', autoAlpha: 1})
              .to(slideInLeft, 0.5, {x:'+=50%', ease: $easing}, 0.15)
              .to(slideOutLeft, 0.5, {x:'+=50%', ease: $easing}, 0.5)
              .to(slideInRight, 0.5, {x:'+=50%', ease: $easing}, 0.35)
              .to(slideOutRight, 1, {x:'+=100%', ease: $easing}, 0.5);

        }

        //Go to next thumb 
        if( previewIn.length !== 0 ){

            thumbTl
              .set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=active'})
              .set(previewOut, {className: '-=active'})
              .to(previewOut, 0.15, {x: '+=100%', ease: $easing}, 0)
              .to(previewIn, 0.15, {x: '+=100%', ease: $easing}, 0);
            
        }

        if( index <= 0 ){

            thumbTl.reverse();
            /*
              .set(previewIn, {x: '0', className: '-=active'})
              .set(lastPreview, {x: '100%', autoAlpha: 1, className: '+=active'})
              .to(lastPreview, 0.15, {x: '-=100%', ease: $easing})
              .to(previewIn, 0.15, {x: '-=100%', ease: $easing});
            */
        }

        //Fade in arrow down
        TweenLite.set($slideNavPrev, {autoAlpha: 1});

        //Fade out arrow up on last slide
        if( index === size ){
            TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
        }
    }

    //Go to Previous slide
    function goToPrevious(slideOut, slideIn, previewIn, previewOut){

        var slideTl = new TimelineLite(),
            slideOutLeft = slideOut.find('>.split-left img'),
            slideOutRight = slideOut.find('>.split-right img'),
            slideInLeft = slideIn.find('>.split-left img'),
            slideInRight = slideIn.find('>.split-right img'),
            index = slideIn.index(),
            size = $('#slider .slide').length,
            thumbTl= new TimelineLite(),
            thumbIndex = previewIn.index(),
            thumbSize = $('#slide-preview .preview').length;

        /*Go to next slide*/
        //Prevent going to blank side
        if( slideIn.length !== 0 ){

            slideTl
              .set(slideIn, {autoAlpha: 1, className: '+=active'})
              .set([slideInLeft, slideInRight], {x:'50%', autoAlpha: 1})
              .set(slideOut, {className: '-=active'})
              .set([slideOutLeft, slideOutRight], {x:'0', autoAlpha: 1})
              .to(slideInRight, 0.5, {x:'-=50%', ease: $easing}, 0)
              .to(slideOutRight, 0.5, {x:'-=50%', ease: $easing}, 0.25)
              .to(slideInLeft, 0.45, {x:'-=50%', ease: $easing}, 0.15)
              .to(slideOutLeft, 0.5, {x:'-=100%', ease: $easing}, 0.5);

        }

        /*Go to previous thumb*/
        //Prevent going to blank side
        if( previewIn.length !== 0 ){

            thumbTl
              .set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=active'})
              .set(previewOut, {className: '-=active'})
              .to(previewOut, 0.15, {x: '+=100%', ease: $easing}, 0)
              .to(previewIn, 0.15, {x: '+=100%', ease: $easing}, 0);
        }

        if( index <= 0 ){

            thumbTl.reverse();
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
    /*
    function goToNextPreview(previewIn, previewOut){

        var thumbTl = new TimelineLite(),
            lastPreview = previewOut.prev('.preview'),
            thumbIndex = previewIn.index(),
            thumbSize = $('#slide-preview .preview').length;

        console.log("N prevIn length is " + previewIn.length)
        console.log("N size is " + size);
        console.log("N index is " + index);

        if( previewIn.length !== 0 ){

            thumbTl
              .set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=active'})
              .set(previewOut, {className: '-=active'})
              .to(previewOut, 0.15, {x: '+=100%', ease: $easing}, 0)
              .to(previewIn, 0.15, {x: '+=100%', ease: $easing}, 0);
            
            if( index <= 0 ){

                tl
                  .set(previewIn, {x: '0', className: '-=active'})
                  .set(lastPreview, {x: '100%', autoAlpha: 1, className: '+=active'})
                  .to(lastPreview, 0.15, {x: '-=100%', ease: $easing})
                  .to(previewIn, 0.15, {x: '-=100%', ease: $easing});
                
            }
        }
    }*/

    //Go to Previous preview
    /*
    function goToPrevPreview(previewIn, previewOut){

        var tl= new TimelineLite(),
            index = previewIn.index(),
            size = $('#slide-preview .preview').length;

            console.log("P size is " + size);
            console.log("P index is " + index);


        if( previewIn.length !== 0 ){

            tl
              .set(previewIn, {x:'-100%', autoAlpha: 1, className: '+=active'})
              .set(previewOut, {className: '-=active'})
              .to(previewOut, 0.15, {x: '+=100%', ease: $easing}, 0)
              .to(previewIn, 0.15, {x: '+=100%', ease: $easing}, 0);
        }

        if( index <= 0){

            tl.reverse();
        }
    }*/

    /**Nav click**/
    //Go to next slide
    $slideNavNext.click(function(e){
        
        e.preventDefault();

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').next('.slide'),
            previewOut = $('.preview.active'),
            previewIn = $('.preview.active').next('.preview'); 

        //goToNextPreview(previewIn, previewOut);
        goToNext(slideOut, slideIn, previewIn, previewOut);   
    });

    //Go to previous slide
    $slideNavPrev.click(function(e){
        
        e.preventDefault();            

        var slideOut = $('.slide.active'),
            slideIn = $('.slide.active').prev('.slide'),
            previewOut = $('.preview.active'),
            previewIn = $('.preview.active').prev('.preview'); 

        //goToPrevPreview(previewIn, previewOut);    
        goToPrevious(slideOut, slideIn, previewIn, previewOut);
    });

})($);