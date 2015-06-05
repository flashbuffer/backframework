/**
 * Created by moon on 15/5/29.
 */

function Network() {

    this.dev_mode = true; // dev mode 将不做任何网络请求

    this.post = function (url, inputData, callback) {

        if (this.dev_mode == true){
            var json = {"code":1,"error_text":"","house_list":[{"community_name":"百合园A区","buildin_name":"百合园A区1#楼","house_id":5010,"room_number":"3-322","area":"05010","unit":"3","serialNumber":"05010"},{"community_name":"百合园A区","buildin_name":"百合园A区3#北侧西地上车位","house_id":11197,"room_number":" -02","area":"11197","unit":"","serialNumber":"11197"}]};
            callback(json);
            return;
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: url,
            data: inputData,
            success: function (resultData, textStatus, jqXHR) {
                console.log('v resultData');
                console.log(resultData);
                if (resultData.code == 1) {
                    callback(resultData);
                } else {
                    alert(resultData.error_text);
                }
            }

        });
    }
}

window.net = new Network();
