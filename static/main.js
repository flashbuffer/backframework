/**
 * Created by moon on 15/5/25.
 */
//global setting for this app.
define(function(require) {

    for (var key in rz){
        if (key != 'url_prefix' ){
            rz[key] = rz['url_prefix']+ rz[key];
       }
    }
    console.log('v rz.config');
    console.log(rz);

    $(document).ajaxStart(function(){
     $('#loading_img').show();

    });

    $(document).ajaxStop(function(){
        $('#loading_img').hide();

    });

    $(document.body).on( 'click', '.dropdown-menu li', function( event ) {
      $(this).closest('.dropdown')
         .find('.dropdown-toggle span').text($(this).text());
   });

    $.fn.showWithAnimation= function(){
        this.css({'opacity':'0'});
        this.show().animate({opacity:"1"},"slow");
    };

    var MainMenu = Backbone.Router.extend({

        routes: {
            "baseData": "baseData"   // #baseData
        },

        baseData: function () {
            var viewClass = require('./base_data/bd_skeleton.js').viewClass;
            var bd_skeleton = new viewClass({ el: $(".col_main") });
            bd_skeleton.render();
        }

    });
    var mainMenu = new MainMenu();

    Backbone.history.start();
});




