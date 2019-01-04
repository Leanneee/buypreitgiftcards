/**
 * FastClick
 */

//if ('addEventListener' in document) {
//    document.addEventListener('DOMContentLoaded', function () {
//        FastClick.attach(document.body);
//    }, false);
//}

(function ($) {
    $(function () {
        /**
         * Slidebars Controller
         */

        // Init
        var controller = new slidebars();
        controller.init();

        // Toggle main menu
        $('.js-toggle-main-menu').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.toggle('main-menu');
        });     

        // Close any
        $(document).on('click', '.js-close-any', function (event) {
            if (controller.getActiveSlidebar()) {
                event.preventDefault();
                event.stopPropagation();
                controller.close();
            }
        });

        // Close Slidebar links
        $('[off-canvas] a').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var url = $(this).attr('href'),
			target = $(this).attr('target') ? $(this).attr('target') : '_self';

            controller.close(function () {
                window.open(url, target);
            });
        });

        // Add close class to canvas container when Slidebar is opened
        $(controller.events).on('opening', function (event) {
            $('[canvas]').addClass('js-close-any');
        });

        // Add close class to canvas container when Slidebar is opened
        $(controller.events).on('closing', function (event) {
            $('[canvas]').removeClass('js-close-any');
        });
    


        // Mobile only
        var windowWidth,
        mobileOnly = function () {
            windowWidth = $(window).width();

            if (windowWidth > 767) {
                controller.close('demo-mobile-only');
            }
        };

        mobileOnly();
        $(window).on('resize', mobileOnly);

        $('.js-open-demo-mobile-only').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (windowWidth < 767) {
                controller.toggle('demo-mobile-only');
            }
        });

        $('.js-toggle-demo-mobile-only').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (windowWidth < 767) {
                controller.toggle('demo-mobile-only');
            }
        });

        $('.js-close-demo-mobile-only').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.close('demo-mobile-only');
        });

      
        // Events
        $('.js-events-init').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.init();
        });

        $('.js-events-exit').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.exit();
        });

        $('.js-events-css').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.css();
        });

        $('.js-open-demo-events').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.open('demo-events');
        });

        $('.js-toggle-demo-events').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.toggle('demo-events');
        });

        $('.js-close-demo-events').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.close('demo-events');
        });

        // Event demo listeners
        if (/demos\/events/.test(window.location.href)) {
            $(controller.events).on('init', function () {
                console.log('init - Slidebars has been initialized.');
            });

            $(controller.events).on('exit', function () {
                console.log('exit - Slidebars has been disabled.');
            });

            $(controller.events).on('css', function () {
                console.log('css - Slidebars css has been reset.');
            });

            $(controller.events).on('opening', function (event, id) {
                if (id === 'demo-events') {
                    console.log('opening - The events demo Slidebar is opening.');
                }
            });

            $(controller.events).on('opened', function (event, id) {
                if (id === 'demo-events') {
                    console.log('opened - The events demo Slidebar is opened.');
                }
            });

            $(controller.events).on('closing', function (event, id) {
                if (id === 'demo-events') {
                    console.log('closing - The events demo Slidebar is closing.');
                }
            });

            $(controller.events).on('closed', function (event, id) {
                if (id === 'demo-events') {
                    console.log('closed - The events demo Slidebar is closed.');
                }
            });
        }

        // Callbacks demo
        $('.js-callbacks-init').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.init(function () {
                console.log('This message was logged by a callback after initializing Slidebars.');
            });
        });

        $('.js-callbacks-exit').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.exit(function () {
                console.log('This message was logged by a callback after exiting Slidebars.');
            });
        });

        $('.js-callbacks-css').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.css(function () {
                console.log('This message was logged by a callback after resetting Slidebars CSS.');
            });
        });

        $('.js-open-demo-callbacks').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.open('demo-callbacks', function () {
                console.log('This message was logged by a callback after opening the Slidebar.');
            });
        });

        $('.js-toggle-demo-callbacks').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.toggle('demo-callbacks', function () {
                console.log('This message was logged by a callback after toggling the Slidebar.');
            });
        });

        $('.js-close-demo-callbacks').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            controller.close('demo-callbacks', function () {
                console.log('This message was logged by a callback after closing the Slidebar.');
            });
        });
    });
})(jQuery);