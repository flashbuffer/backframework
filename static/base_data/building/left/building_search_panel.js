/**
 * Created by moon on 15/6/4.
 */
define(function(require,exports) {
    var BuildingSearchPanel = Backbone.View.extend({
        name:"BuildingSearchPanel",
        initialize: function(){
        },
        render: function(){

            var html = require('./building_search_panel.html');
            var tpl= _.template(html);
            var that = this;
            net.post(rz.list_user_house, '{"user_id":"1521146"}', function (serverData) {
                html = tpl({house_list: serverData.house_list});
                that.$el.html(html);
                $('#building_search_panel_content').find('select').multiselect();

            });
        },

        events: {
            "click .js_search_building_btn": "clickSearchBuildingBtn",
            "click .js_btn_choose_house": "clickChooseHouseBtn"
        },

        clickSearchBuildingBtn:function(){

            alert('search building');
        },

        clickChooseHouseBtn:function(){

            var cache_building_tree = require('../../cache_building_tree.js');

            var diaTree = $('#dialog_house_tree').jstree({
                'plugins': ["wholerow"],
                'core': {
                    "dblclick_toggle": false,
                    'data': cache_building_tree.treeJson

                } });

            diaTree.bind("loaded.jstree", function (event, data) {
                data.instance.open_all();
            });

            diaTree.on('changed.jstree', function (e, data) {
                data.instance.toggle_node(data.selected[0]);
            });

           $('#house_choose_dialog').modal();
        }
    });



    exports.viewClass = BuildingSearchPanel;
});