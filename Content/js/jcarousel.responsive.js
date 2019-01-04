(function ($) {
    $(function () {
        var jcarousel = $('.jcarousel');

        var carousel1 = jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();


                var counter = carousel[0].firstElementChild.children.length;

                if (width >= 600 && counter > 2) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
                for (var i = 0; i < carousel[0].firstElementChild.children.length; i++) {
                    carousel[0].firstElementChild.children[i].style.width = Math.ceil(width) + 'px';
                }

                if (counter < 3)
                {
                    $('.jcarousel-control-next').addClass('hidden');
                    $('.jcarousel-control-prev').addClass('hidden');                   
                }
                else
                {
                    $('.jcarousel-control-next').removeClass('hidden');
                    $('.jcarousel-control-prev').removeClass('hidden');
                }
            })
            .jcarousel({
                wrap: null
            });
        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });
        
        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });
        //$('.jcarousel-pagination')
        //    .on('jcarouselpagination:active', 'a', function () {
        //        $(this).addClass('active');
        //    })
        //    .on('jcarouselpagination:inactive', 'a', function () {
        //        $(this).removeClass('active');
        //    })
        //    .on('click', function (e) {
        //        e.preventDefault();
        //    })
        //    .jcarouselPagination({
        //        perPage: 1,
        //        item: function (page) {
        //            return '<a href="#' + page + '">' + page + '</a>';
        //        }
        //    });
    });
})(jQuery);