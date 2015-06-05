/**
 * Created by moon on 15/6/5.
 */
define(function(require,exports) {
    var ResidentResultPanel = Backbone.View.extend({
        initialize: function () {

        },

        render: function(){
            var html = require('./house_list.html');
            this.$el.html(html);
        },
        events:{
            "click .js_house_list": "clickList"
        },

        clickList: function () {
            if ($('.opp_result').is(':visible')) {
                $('.opp_result').hide().animate({right: -370}, "fast");
            } else {
                $('.opp_result').show().animate({right: 0}, "fast");
            }
        }
    });

    exports.viewClass = ResidentResultPanel;
});