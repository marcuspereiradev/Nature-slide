// DEBOUNCE DO LODASH

debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//MUDAR TAB AO CLIQUE

$('[data-group]').each(function(){
	var $allTarget = $(this).find('[data-target]'),
			$allClick = $(this).find('[data-click]'),
			activeClass = 'active';
	
	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);
	
	$allClick.click(function(e){
		e.preventDefault();
		
		var id = $(this).data('click'),
				$target = $('[data-target="' + id + '"]');
		
		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);
		
		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});

$('.menu-nav a[href^="#"]').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
			menuHeight = $('.menu').innerHeight(),
			targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

//SCROLL SUAVE PARA O TOPO

$('.logo').click(function(e){
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500)
});

// MUDAR PARA ACTIVE O MENU DE ACORDO COM A ÁREA
$('section').each(function(){
	var height = $(this).height(),
			offsetTop = $(this).offset().top,
			menuHeight = $('.menu').innerHeight(),
			id = $(this).attr('id'),
			$itemMenu = $('a[href="#' + id + '"]');
	
	$(window).scroll(debounce(function(){
		var scrollTop = $(window).scrollTop();
		if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}
	}, 200));
});

// BOTÃO DO MENU MOBILE

$('.mobile-btn').click(function(){
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

// SLIDER
(function(){
    function slider(sliderName, velocidade) {
        var slideClass = '.' + sliderName,
            activeClass = 'active',
            rotate = setInterval(rotateSlide, velocidade);

        $(slideClass + ' > :first').addClass(activeClass);

        $(slideClass).hover(function(){
            clearInterval(rotate);
        }, function(){
            rotate = setInterval(rotateSlide, velocidade);
        });

        function rotateSlide() {
            var activeSlide = $(slideClass + ' > .' + activeClass),
                nextSlide = activeSlide.next();

            if(nextSlide.length == 0) {
                nextSlide = $(slideClass + ' > :first');
            }
            activeSlide.removeClass(activeClass);
            nextSlide.addClass(activeClass);
        }

    }
    slider('introducao', 3000);
})();

// ANIMAÇÃO AO SCROLL
(function(){
    var $target = $('[data-anime="scroll"]'),
        animationClass = 'animate',
        offset = $(window).height() * 3/4;

    function animeScroll() {
        var documentTop = $(window).scrollTop();

        $target.each(function(){
            var itemTop = $(this).offset().top;
            if (documentTop > itemTop - offset) {
                $(this).addClass(animationClass);
            }else {
                $(this).removeClass(animationClass);
            }
        });
    }

    animeScroll();

    $(document).scroll(debounce(function(){
        animeScroll();
    }, 200));
})();



































