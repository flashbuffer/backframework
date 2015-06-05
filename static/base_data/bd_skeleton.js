/**
 * Created by moon on 15/5/25.
 */
define(function (require, exports) {
    var current_left_panel; //当前选择的二级菜单（导航）
    var current_right_panel;

    var ViewBaseData = Backbone.View.extend({
            initialize: function () {

            },

            render: function () {
                var html = require("./bd_skeleton.html");

                this.$el.html(html);

                var leftViewClass = require("./resident/left/resident_search_panel.js").viewClass;
                var rightViewClass = require("./resident/right/resident_list.js").viewClass;

                this.panelProcess(leftViewClass,rightViewClass);

            },

            events: {
                "click .js_menu_resident": "selectResident",
                "click .js_menu_staff": "selectStaff",
                "click .js_menu_building": "selectBuilding",
                "click .js_incident_category": "selectIncidentCategory",
                "click .js_search_tool_bar": "clickSearchIcon",
                "click .js_return_tool_bar": "clickReturn"
            },

            selectResident: function () {
                var leftViewClass = require("./resident/left/resident_search_panel.js").viewClass;
                var rightViewClass = require("./resident/right/resident_list.js").viewClass;

                this.panelProcess(leftViewClass,rightViewClass);

            },
            selectStaff: function () {

            },
            selectBuilding: function () {
               var leftViewClass = require('./building/left/building_tree.js').viewClass;
               var rightViewClass = require("./building/right/house_list.js").viewClass;

               this.panelProcess(leftViewClass,rightViewClass);
            },
            clickSearchIcon: function () {
                $('#generic_tool_bar').hide();
                $('#tool_bar_return').show();
                var viewClass = require('./building/left/building_search_panel.js').viewClass;

                this.leftPanelProcess(viewClass);
            },
            clickReturn: function () {
                $('#tool_bar_return').hide();
                $('#generic_tool_bar').show();


                var viewClass = require('./building/left/building_tree.js').viewClass;

                this.leftPanelProcess(viewClass);


            },
            panelProcess:function(leftViewClass,rightViewClass){
                this.leftPanelProcess(leftViewClass);

                this.rightPanelProcess(rightViewClass);


           },
            leftPanelProcess:function(leftViewClass){

                if (current_left_panel){
                    current_left_panel.remove();
                    $('#left_panel').append('<div id="content_left_panel"/>');
                }

                $('#left_panel').hide();

                current_left_panel = new leftViewClass({el: $('#content_left_panel')});
                current_left_panel.render();

                $('#left_panel').showWithAnimation();

            },rightPanelProcess:function(rightViewClass){
                if (current_right_panel){
                    current_right_panel.remove();
                    $('#right_panel').append('<div id="content_right_panel"/>');
                }

                $('#right_panel').hide();
                current_right_panel = new rightViewClass({el: $('#content_right_panel')});
                current_right_panel.render();
                $('#right_panel').showWithAnimation();
            }

        }
    );

    exports.viewClass = ViewBaseData;
});