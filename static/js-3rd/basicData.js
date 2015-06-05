/**
 * Created by moon on 15/5/22.
 */
define(function(require) {

    // 获取文本内容
    var html = require('../tpl/organization.tpl');

    console.log(html);

    var tpl= _.template( html);

    html = tpl({name: "leilei chen"});


    $(".col_main").html(html);
});