/**
 * Main JS file for kaldorei behaviours
 */

var $window = $(window);

/* globals jQuery, document */
(function($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function() {
        var $postContent = $(".post-content");
        $postContent.fitVids();

        //$(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        var timer = null;
        $window.scroll(function() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            else {
                timer = setTimeout(function () {
                    var scrollerToTop = $('.backTop');
                    var scrollerTOC = $('.widget-toc');
                    document.documentElement.scrollTop + document.body.scrollTop > 200 ?
                        scrollerToTop.show() :
                        scrollerToTop.hide();
                    document.documentElement.scrollTop + document.body.scrollTop > 250 ?
                        scrollerTOC.addClass("widget-toc-fixed") :
                        scrollerTOC.removeClass("widget-toc-fixed");
                }, 50);
            }
        });

        // #backTop Button Event
        $("#backTop").on("click", function() {
            $window.scrollTop(0);
        });

        // highlight config
        hljs.initHighlightingOnLoad();

        // numbering for pre>code blocks
        $(function() {
            $('pre code').each(function() {
                var lines = $(this).text().split('\n').length - 1;
                var $numbering = $('<ul/>').addClass('pre-numbering');
                $(this).addClass('has-numbering').parent().append($numbering);
                for (var i = 1; i <= lines; i++) {
                    $numbering.append($('<li/>').text(i));
                }
            });
        });

        var toc = $('.toc');
        // toc config
        toc.toc({
            content: ".post-content",
            headings: "h2,h3,h4,h5"
        });

        if (toc.children().length == 0) $(".widget-toc").hide();

        var tocHieght = toc.height();
        var tocFixedHeight = $window.height() - 192;
        tocHieght > tocFixedHeight ?
            toc.css('height', tocFixedHeight) :
            toc.css('height', tocHieght)

        $window.resize(function() {
            var tocFixedHeight = $(this).height() - 192;
            tocHieght > tocFixedHeight ?
                toc.css('height', tocFixedHeight) :
                toc.css('height', tocHieght)
        });

        // tooltip config
        $('[data-rel=tooltip]').tooltip();

        // add archives year
        var yearArray = new Array();
        $(".archives-item").each(function() {
            var archivesYear = $(this).attr("date");
            yearArray.push(archivesYear);
        });
        var uniqueYear = $.unique(yearArray);
        for (var i = 0; i < uniqueYear.length; i++) {
            var html = "<div class='archives-item fadeInDown animated'>" +
                "<div class='archives-year'>" +
                "<h3><time datetime='" + uniqueYear[i] + "'>" + uniqueYear[i] + "</time></h3>" +
                "</div></div>";
            $("[date='" + uniqueYear[i] + "']:first").before(html);
        }
    });

})(jQuery);
