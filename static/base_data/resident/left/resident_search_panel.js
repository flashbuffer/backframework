/**
 * Created by moon on 15/6/5.
 */
define(function(require,exports) {
    var ResidentSearchPanel = Backbone.View.extend({
        initialize: function(){
        },
        render: function(){
            var html = require('./resident_search_panel.html');
            //var tpl= _.template(html);
            this.$el.html(html);
            this.$el.find('select').multiselect();
       }


    });

    exports.viewClass = ResidentSearchPanel;
});