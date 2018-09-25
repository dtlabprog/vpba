(function ($, Drupal, drupalSettings) {

    'use strict';
    Drupal.behaviors.videoReplacement = {
        attach: function (context, settings) {
            var video_preview = '.view-display-id-block_3 .views-row .video-embed-field-provider-youtube';
            $(video_preview).once().on('click', function() {
                    console.log('333');
            });
        }
    };
})(jQuery, Drupal, drupalSettings);


