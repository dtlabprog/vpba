(function ($) {
    /**
     * Handle search submit.
     */
    function ajaxSearchSubmit(e) {
        e.preventDefault();
        var query = encodeURIComponent($('#edit-keys').val());
        var url = '/search/node?keys=' + query + ' ol.search-results, .pager-nav, .count-items';
        $('#results-container').load(url, null, function (responseText, textStatus, jqXHR) {
            var $this = $(this);
            $this.find('.pager-nav  .pagination a').each(function (i) {
                $(this).attr('href', '/search/node' + $(this).attr('href'));
                $(this).once().click(ajaxSearchClick);
            });
        });
    }

    /**
     * Handle search pager clicks.
     */
    function ajaxSearchClick(e) {
        e.preventDefault();
        var query = encodeURIComponent($('#edit-keys').val());
        var link = e.currentTarget.href;
        var url = link + ' ol.search-results, .pager-nav, .count-items';
        $('#results-container').load(url, null, function (responseText, textStatus, jqXHR) {
            var $this = $(this);
            $this.find('.pager-nav  .pagination a').each(function (i) {
                $(this).attr('href', '/search/node' + $(this).attr('href'));
                $(this).once().click(ajaxSearchClick);
            });
            $('#search').scrollTop(0);
        });
    }

    Drupal.behaviors.getSearch = {
        attach: function (context, settings) {
            $('#block-search li a, #block-search-2 li a').text('');
            $('#block-search li a, #block-search-2 li a, .close-text').on('click', function (e) {
                e.preventDefault();
                $('#search').toggleClass('hide');
            });
            $('#search-block-form').submit(ajaxSearchSubmit)
        }
    };

    Drupal.behaviors.change_class_main_content = {
        attach: function (context, settings) {
            $('body:not(.front-page) .js-quickedit-main-content .col-sm-3').once().each(function () {
                $(this).addClass('col-md-10 col-sm-12');
            });
        }
    };
    /**
     * Displayed option of 'alt' to image.
     */
    Drupal.behaviors.displayAlt = {
        attach: function (context, settings) {
            $('body:not(.page-node-type-gallery) .view-nodes .views-field-field-image img').once().each(function () {
                $(this).parent().after($('<span class="img-alt">').html($(this).attr('alt')));
            });
        }
    };
    Drupal.behaviors.changeMenu = {
        attach: function (context, settings) {
            $('body:not(.front-page) header, body.path-user header, body.path-bloggers header').addClass('mini-menu');
            $(document).ready(function () {
                if ($(window).width() < 768) {
                    $('header').addClass('mini-menu');
                }
            });

            $(window).once().resize(function () {
                if ($(window).width() < 768) {
                    $('header').addClass('mini-menu');
                } else {
                    $('header').removeClass('mini-menu');
                }
            });

            $(window).scroll(function () {
                if ($(window).scrollTop() > 0) {
                    $('header').addClass('mini-menu');
                } else {
                    if ($(window).width() < 768) {
                        $('header').addClass('mini-menu');
                    } else {
                        $('body.path-frontpage header').removeClass('mini-menu');
                    }
                }
            });
        }
    };
    Drupal.behaviors.addGlyphiconIcons = {
        attach: function (context, settings) {
            $('#cboxPrevious').once().addClass('glyphicon glyphicon-chevron-left');
            $('#cboxNext').once().addClass('glyphicon glyphicon-chevron-right');
        }
    };
    /**
     * Disable click on main menu for main header.
     */
    Drupal.behaviors.clickMainMenu = {
        attach: function (context, settings) {
            $('header:not(.mini-menu)').once().on("click mouseover mouseout", "li.expanded" ,function (e) {
                if(e.type === 'mouseover') {
                    $(this).toggleClass('open');
                } else if(e.type === 'mouseout') {
                    $(this).removeClass('open');
                    return false;
                }
                if(e.type === 'click') {
                    if (e.target.tagName === 'A') {
                        if(e.target.className === 'dropdown-toggle') {
                            return false;
                        } else {
                            document.getElementById('navbar-collapse').style.cssText = 'display:none !important';
                        }
                    } else {
                        return false;
                    }
                }
            });

        }
    };
})(jQuery);


