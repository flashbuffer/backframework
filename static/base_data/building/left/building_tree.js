/**
 * Created by moon on 15/6/5.
 */
define(function(require,exports) {
    var BuildingTreePanel = Backbone.View.extend({
        initialize: function(){
        },
        render: function(){
            var treeHtml = require('./building_tree.html');

            this.$el.html(treeHtml);
            var cache_building_tree = require('../../cache_building_tree.js');

            var buildingTree = $('#building_tree').jstree({
                'plugins': ["wholerow"],
                'core': {
                    "dblclick_toggle": false,
                    'data': cache_building_tree.treeJson

                } });

            buildingTree.bind("loaded.jstree", function (event, data) {
                data.instance.open_all();
            });
    }});

    exports.viewClass = BuildingTreePanel;
});