/**
 * Created by moon on 15/5/29.
 */
define(function(require,exports) {

    var HouseDetail = Backbone.View.extend({

        initialize: function(){
        },

        render: function(){

            var html = require('./../../tpl/house_detail.html');
            var tpl= _.template( html);

            net.post(rz.list_user_house, '{"user_id":"1521146"}', function (serverData) {
                html = tpl({house_list: serverData.house_list});
                $('.opp_result').first().html(html);

            });
       },

        events: {
            "click .js_close": "closeSlide"
        },

        closeSlide:function(){
            $('.opp_result').first().hide().animate({right: -370}, "fast");

        }
    });


    var houseDetail = new HouseDetail({el:$('.opp_result').first()});

    exports.houseDetail = houseDetail;
});
